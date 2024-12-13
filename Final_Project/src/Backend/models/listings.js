const mongoose = require('mongoose');

// Define the Schema for a listing
const ListingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  propertyType: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: { type: [String], required: true }, // Array of amenities
  description: { type: String, required: true }
});

module.exports = mongoose.model('Listing', ListingSchema);
