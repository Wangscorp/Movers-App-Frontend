import { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../components/DriverCard";
import Navbar from "../components/Navbar"; // Optional Navbar for navigation
import "../styles/Dashboard.css"; // Styling for the Dashboard

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]); // Store available drivers
  const [user, setUser] = useState(null); // Store logged-in user details (if any)
  const [loading, setLoading] = useState(true); // Loading state for data fetching

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
  }, []);

  if (loading) return <p>Loading...</p>; // Show a loading indicator while fetching data

  return (
    <div>
      <Navbar isLoggedIn={!!user} userRole={user?.role} /> {/* Optional Navbar */}
      <div className="dashboard">
        <h1>Available Drivers</h1>
        {/* Display drivers for all users */}
        <div className="drivers-grid">
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <DriverCard
                key={driver.id}
                name={driver.name}
                contact={driver.contact}
                location={driver.location}
              />
            ))
          ) : (
            <p>No drivers available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
