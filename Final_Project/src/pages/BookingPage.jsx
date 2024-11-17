import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import listings from '../Backend/data/bookings.json';  
import '../Pages_Styles/Bookings.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false); // New state

  const redirectToHome = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const selectedListing = listings.find(item => item.id === id);
    setListing(selectedListing);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || guests < 1) {
      setIsFormValid(false);
      setIsSubmissionSuccess(false); // Reset success state
      return;
    }
    setIsFormValid(true);
    setIsSubmissionSuccess(true); // Set success state
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-page">
      <h2>Booking for {listing.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </label>
        <label>
          Check-out Date:
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </label>
        <label>
          Number of Guests:
          <input type="number" value={guests} min="1" onChange={(e) => setGuests(e.target.value)} />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
      {!isFormValid && <p>Please fill in all the required fields correctly.</p>}
      {isSubmissionSuccess && <p style={{ color: 'green' }}>Data submitted successfully!</p>}
      <br />
      <button className="home-btn" onClick={redirectToHome}>
        Home
      </button>
    </div>
  );
};

export default BookingPage;
