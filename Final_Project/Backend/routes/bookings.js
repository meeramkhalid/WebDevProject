const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bookingsFilePath = path.join(__dirname, '../data/bookings.json');
let bookings = require(bookingsFilePath); // Load existing bookings from JSON file

// Endpoint: Get all bookings
router.get('/', (req, res) => {
  res.json(bookings);
});

// Endpoint: Search bookings by guest name
router.get('/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Guest name query is required' });
  }

  const filteredBookings = bookings.filter(booking =>
    booking.guestName.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredBookings);
});

// Endpoint: Get booking details by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const booking = bookings.find(item => item.id === id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.json(booking);
});

// Endpoint: Create a new booking
router.post('/', (req, res) => {
  const { guestName, checkIn, checkOut, guests } = req.body;

  // Validate required fields (removed propertyId from validation)
  if (!guestName || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create new booking object (removed propertyId)
  const newBooking = {
    id: (bookings.length + 1).toString(),
    guestName,
    checkIn,
    checkOut,
    guests,
  };

  // Add to in-memory array
  bookings.push(newBooking);

  // Write updated bookings to the JSON file for persistence
  fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2), (err) => {
    if (err) {
      console.error('Failed to save bookings:', err);
      return res.status(500).json({ message: 'Failed to save booking' });
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  });
});

module.exports = router;
