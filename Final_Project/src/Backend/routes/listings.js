const express = require('express');
const Listing = require('../models/listings');
const router = express.Router();

// GET all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
});

// GET a specific listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listingId = req.params.id; // Get the ID from the URL parameter
    const listing = await Listing.findById(listingId); // Query the database for the listing

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' }); // Return 404 if listing doesn't exist
    }

    res.status(200).json(listing); // Return the listing data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listing', error });
  }
});

// POST a new listing
router.post('/', async (req, res) => {
  try {
    // The body should have all the required fields
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error saving listing', error });
  }
});

module.exports = router;
