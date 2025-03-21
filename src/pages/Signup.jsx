import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovingHeader from "../components/MovingHeader";
import axios from "axios"; // For API requests
import "../styles/Login.css";

const Signup = () => {
  const [role, setRole] = useState(""); // Track selected role
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate(); // Redirect to dashboard

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Send user data to the backend
    try {
      const response = await axios.post("/api/signup", {
        email: formData.email,
        password: formData.password,
        role: role,
      });

      if (response.status === 201) {
        alert("Signup successful!");
        // Redirect based on user role
        if (role === "customer") {
          navigate("/dashboard?role=customer");
        } else if (role === "driver") {
          navigate("/dashboard?role=driver");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="signup-form">
        <MovingHeader message="Welcome to Movers, Here we move the world !!" />
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Email</label>
            <div className="input-line"></div>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>Password</label>
            <div className="input-line"></div>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="key"></ion-icon>
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <label>Confirm Password</label>
            <div className="input-line"></div>
          </div>
          <div className="role-select">
            <label>Select your role:</label>
            <select value={role} onChange={handleRoleChange} required>
              <option value="" disabled>
                --Select Role--
              </option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <button type="submit">Signup</button>
        </form>
        <div className="register-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
