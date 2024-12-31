const express = require('express');
const Listing = require('../models/listings');
const { protect, checkAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin: Fetch all listings
router.get('/listings', protect, checkAdmin, async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Error fetching listings', details: error });
  }
});

// Admin: Add a new listing
router.post('/listings', protect, checkAdmin, async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ error: 'Error creating listing', details: error });
  }
});

// Admin: Delete a listing by ID
router.delete('/:id', protect, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting listing', details: error });
  }
});

// Admin: Update a listing by ID
router.put('/listings/:id', protect, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: 'Error updating listing', details: error });
  }
});

module.exports = router;
