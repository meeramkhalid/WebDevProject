const mongoose = require('mongoose');

// Define the Schema for a listing
const ListingSchema = new mongoose.Schema({
  id: { type: String,  },
  image: { type: String, },
  title: { type: String,  },
  propertyType: { type: String,  },
  guests: { type: Number,  },
  bedrooms: { type: Number,  },
  bathrooms: { type: Number,  },
  price: { type: Number,  },
  rating: { type: Number,  },
  location: { type: String,  },
  amenities: { type: [String],  }, // Array of amenities
  description: { type: String,  }
});

module.exports = mongoose.model('Listing', ListingSchema);
