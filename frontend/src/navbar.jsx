import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
    
      <div className="logo" onClick={() => navigate("/main")}>
        QBank
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/main")}>Home</li>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/about")}>About</li>

      </ul>

      
      <div className="nav-right">
        {/* <input type="text" placeholder="Search..." className="search-box" /> */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
