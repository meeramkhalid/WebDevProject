const express = require('express');
const cors = require('cors');
const app = express();
const listingsRoute = require('./routes/listings');
const bookingsRoute = require('./routes/bookings');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Handle all preflight OPTIONS requests
app.options('*', cors());

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/listings', listingsRoute);
app.use('/api/bookings', bookingsRoute);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
