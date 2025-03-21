import { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../components/DriverCard";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]); // Store available drivers
  const [user, setUser] = useState(null); // Store logged-in user details
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [selectedDriver, setSelectedDriver] = useState(null); // Track selected driver for payment/review
  const [filter, setFilter] = useState(""); // Track filter input
  const [reviewText, setReviewText] = useState(""); // Track review text

  useEffect(() => {
    const fetchDriversAndUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // If a token exists, fetch user details
        if (token) {
          const userResponse = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userResponse.data);
          alert(`Welcome, ${userResponse.data.role}: ${userResponse.data.username}`);
        }

        // Fetch drivers available to everyone
        const driversResponse = await axios.get("/api/drivers");
        setDrivers(driversResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchDriversAndUser();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchDriversAndUser, 30000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handlePayment = async (driverId) => {
    try {
      const response = await axios.post("/api/payment", {
        driverId,
        amount: 1000, // Example amount
        customerId: user.id,
      });
      alert(`Payment successful: ${response.data.message}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleReview = async (driverId) => {
    try {
      const response = await axios.post("/api/review", {
        driverId,
        customerId: user.id,
        review: reviewText,
      });
      alert(`Review submitted: ${response.data.message}`);
      setReviewText(""); // Clear the review input
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(filter.toLowerCase()) ||
    driver.location.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading...</p>; // Show a loading indicator while fetching data

  return (
    <div>
      <Navbar isLoggedIn={!!user} userRole={user?.role} />
      <div className="dashboard">
        <h1>Welcome, {user?.username || "Guest"}!</h1>

        {user?.role === "admin" && (
          <div className="admin-panel">
            <h2>Admin Dashboard</h2>
            <p>Manage payments, drivers, and customers here.</p>
          </div>
        )}

        {user?.role === "customer" && (
          <div className="customer-panel">
            <h2>Available Drivers</h2>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-input"
            />
            <div className="drivers-grid">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <DriverCard
                    key={driver.id}
                    name={driver.name}
                    contact={driver.contact}
                    location={driver.location}
                    onSelect={() => setSelectedDriver(driver)}
                  />
                ))
              ) : (
                <p>No drivers match your search criteria.</p>
              )}
            </div>

            {selectedDriver && (
              <div className="driver-actions">
                <h3>Selected Driver: {selectedDriver.name}</h3>
                <button onClick={() => handlePayment(selectedDriver.id)}>
                  Pay via M-Pesa
                </button>
                <textarea
                  placeholder="Leave a review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button onClick={() => handleReview(selectedDriver.id)}>
                  Submit Review
                </button>
              </div>
            )}
          </div>
        )}

        {user?.role === "driver" && (
          <div className="driver-panel">
            <h2>Your Jobs</h2>
            <p>View assigned jobs and payment status here.</p>
          </div>
        )}

        <div className="map-container">
          <h2>Driver Locations</h2>
          <Map drivers={drivers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
