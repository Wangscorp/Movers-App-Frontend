import React from "react";
import "../styles/DriverCard.css";

const DriverCard = ({ name, contact, location }) => {
  return (
    <div className="driver-card">
      <h3>{name}</h3>
      <p><strong>Contact:</strong> {contact}</p>
      <p><strong>Location:</strong> {location}</p>
    </div>
  );
};

export default DriverCard;
