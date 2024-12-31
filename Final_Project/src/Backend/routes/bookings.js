const express = require('express');
const Booking = require('../models/bookings');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Create a new booking (authenticated users only)
router.post('/', protect, async (req, res) => {
  try {
    const { listingId, checkInDate, checkOutDate, guests } = req.body;
    console.log(req.body);
    // Create a booking with the logged-in user's ID
    const newBooking = new Booking({
      userId: req.user._id,
      listingId,
      checkInDate,
      checkOutDate,
      guests,
     // totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Get all bookings (authenticated users only)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('userId', 'name email') // Optional: Populate user details
      .populate('listingId'); // Populate listing details
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
