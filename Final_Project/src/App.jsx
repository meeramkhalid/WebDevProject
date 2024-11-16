import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes from 'react-router-dom'
import Home from './components/home';
import ListingDetailsPage from './pages/ListingDetailsPage';  
import BookingPage from './pages/BookingPage';  
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>      
      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route (home page) */}
        <Route path="/listing/:id" element={<ListingDetailsPage />} /> {/* Listing details page */}
        <Route path="/booking/:id" element={<BookingPage />} /> {/* Booking page */}
      </Routes>
    </Router>
  );
}

export default App;
