import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save the token and user information to localStorage
      const { token, user } = response.data; // Assuming response contains token and user data
      localStorage.setItem('token', token); // Save the token
      localStorage.setItem('userId', user.id); // Save the userId
      localStorage.setItem('role', user.role); // Save the user's role (e.g., 'admin' or 'user')

      // Navigate based on the user's role
      if (user.role === 'admin') {
        navigate('/'); // Navigate to the admin dashboard (e.g., Home component for admin)
      } else {
        navigate('/'); // Navigate to the home page for regular users
      }

      // Display success message
      setMessage('Login successful! Welcome back, ' + user.username);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="signup-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit} className="signup-form">
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
      className="signup-input"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
      className="signup-input"
    />
    <button type="submit" className="signup-button">Log In</button>
  </form>
  {message && <p className="signup-message">{message}</p>}
</div>

  );
};

export default Login;
