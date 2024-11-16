const express = require('express');
const router = express.Router();
const listings = require('../data/listings.json');

// Endpoint: Get all listings
router.get('/', (req, res) => {
  res.json(listings);
});

// Endpoint: Search listings by location
router.get('/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Location query is required' });
  }

  const filteredListings = listings.filter(item => 
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredListings);
});

// Endpoint: Get listing details by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const listing = listings.find(item => item.id === id);

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  res.json(listing);
});

module.exports = router;
