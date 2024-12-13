const express = require('express');
const Booking = require('../models/bookings');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, listingId, checkInDate, checkOutDate, totalPrice } = req.body;
    const newBooking = new Booking({
      userId,
      listingId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('listingId');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
