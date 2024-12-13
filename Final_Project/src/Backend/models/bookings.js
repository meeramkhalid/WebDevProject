const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
      },
      checkInDate: {
        type: Date,
        required: true,
      },
      checkOutDate: {
        type: Date,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending',
      },
    }, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
