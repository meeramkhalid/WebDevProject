import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Pages_Styles/Bookings.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Get state passed from ListingDetailsPage
  const [listing, setListing] = useState(state?.listing || null); // Use state if passed
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  const redirectToHome = () => {
    navigate(`/`);
  };

  useEffect(() => {
    // If listing is not passed via state, fetch it based on id
    if (!listing) {
      const fetchListing = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
          setListing(response.data);
        } catch (error) {
          console.error('Error fetching listing:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchListing();
    } else {
      setLoading(false); // If listing is passed, no need to fetch again
    }
  }, [id, listing]);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkIn, checkOut, guests, listing]);

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !listing || !listing.price) return;

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const days = (date2 - date1) / (1000 * 60 * 60 * 24); // Calculate number of days

    if (days > 0) {
      setTotalPrice(days * listing.price * guests);
    } else {
      setTotalPrice(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!checkIn || !checkOut || guests < 1) {
      setIsFormValid(false);
      setIsSubmissionSuccess(false);
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated.');
      }
  
      // Convert checkIn and checkOut to ISO 8601 format
      const formattedCheckIn = new Date(checkIn).toISOString();
      const formattedCheckOut = new Date(checkOut).toISOString();
  
      // Create the data object to be sent
      const bookingData = {
        userId,
        listingId: id,
        checkInDate: formattedCheckIn, // Send ISO 8601 format
        checkOutDate: formattedCheckOut, // Send ISO 8601 format
        guests, // Send guests count
      };
  
      console.log('Booking data to send:', bookingData);
  
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setIsFormValid(true);
        setIsSubmissionSuccess(true);
        console.log('Booking created:', response.data);
      } else {
        throw new Error('Failed to create booking.');
      }
    } catch (error) {
      setIsFormValid(false);
      setIsSubmissionSuccess(false);
      alert(error.response?.data?.message || 'An error occurred while creating the booking.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading until data is available
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="booking-page">
      <h2>Booking for {listing.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <label>
          Number of Guests:
          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
      {!isFormValid && <p>Please fill in all the required fields correctly.</p>}
      {isSubmissionSuccess && (
        <p style={{ color: 'green' }}>Booking confirmed!</p>
      )}
      <br />
      <button className="home-btn" onClick={redirectToHome}>
        Home
      </button>
    </div>
  );
};

export default BookingPage;
