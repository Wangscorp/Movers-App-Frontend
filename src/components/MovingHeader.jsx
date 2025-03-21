import React from "react";
import "../styles/MovingHeader.css";

const MovingHeader = ({ message }) => {
  return (
    <div className="moving-header">
      <p>{message}</p>
    </div>
  );
};

export default MovingHeader;
