import React, { useState } from "react";
import "../styles/Login.css";
import "../styles/Signup.css"; // Additional styling for the moving header

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    alert("Signup successful!");
  };

  return (
    <div>
      {/* Moving Header */}
      <div className="moving-header">
        <p>Welcome to Movers</p>
      </div>

      {/* Rotating Text */}
      <div className="rotating-text">
        <p>Signup to Movers</p>
      </div>

      {/* Signup Form */}
      <div className="glowing-light"></div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
            <div className="input-line"></div>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <div className="input-line"></div>
          </div>
          <button type="submit">Signup</button>
          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
