import React from "react";
import "./styles/CircularNav.css";

const CircularNav = () => {
  const menuItems = [
    { id: 1, name: "Drivers", link: "/drivers" },
    { id: 2, name: "History", link: "/history" },
    { id: 3, name: "Orders", link: "/orders" },
    { id: 4, name: "Home", link: "/" },
    { id: 5, name: "Reviews", link: "/reviews" },
  ];

  return (
    <div className="circular-nav">
      <button className="central-button">Menu</button>
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <li key={item.id} style={{ "--i": index }}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CircularNav;
