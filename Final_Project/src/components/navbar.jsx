import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../components_styles/navbar.css';
import SearchBar from '../components/SearchBar'; 

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate(); // Correct initialization

  const handleLogout = () => {
    localStorage.removeItem('role'); // Clear role from localStorage
    setRole(null); // Clear role in state
    navigate('/login'); // Redirect to the login page
  };

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
         
      {role && (
       // <div className="navbar-user-menu">
          <button onClick={handleLogout}>Logout</button>
        //</div>
      )}
        {/* Link to Login page */}
        <Link to="/login">
          <button>Login</button>
        </Link>

        {/* Link to Sign Up page */}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
