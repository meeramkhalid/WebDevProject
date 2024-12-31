import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './components/Home';
import ListingDetailsPage from './pages/ListingDetailsPage';  
import BookingPage from './pages/BookingPage'; 
import Login from './pages/Login'; 
import Signup from './pages/signup'; 
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar'; 

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole); // Update the role state
    localStorage.setItem('role', newRole); // Save to localStorage for persistence
  };

  return (
    <Router>
            <Navbar role={role} setRole={setRole} />  
      <Routes>
        
        <Route path="/" element={role === 'admin' ? <Dashboard /> : <Home />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/login" element={role ? <Navigate to="/" /> : <Login updateRole={updateRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={role === 'admin' ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
