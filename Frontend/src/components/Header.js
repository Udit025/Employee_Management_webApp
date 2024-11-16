import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Header.css'// External CSS for cleaner styling

function Header(props) {
  return (
    <header className="header">
      <span className="header-title">Employee Management</span>
      <nav className="nav-links">
        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Employees
        </NavLink>
        <NavLink
          to="/createemployee"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Create Employee
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
