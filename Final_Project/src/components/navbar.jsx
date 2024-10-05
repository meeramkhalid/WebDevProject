import React from 'react';
import '../components_styles/navbar.css';
import SearchBar from '../components/SearchBar'; // Make sure the path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/airbnb-logo.png" className="logo-img" alt="Logo" />
      </div>

      <div className="navbar-links">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#experiences">Experiences</a></li>
          <li><a href="#online-experiences">Online Experiences</a></li>
        </ul>
      </div>
      
      <div className="navbar-search">
        <SearchBar />
      </div>

      <div className="navbar-user-menu">
        <button>Login</button>
        <button>Sign Up</button>
      </div>

    </nav>
  );
};

export default Navbar;
