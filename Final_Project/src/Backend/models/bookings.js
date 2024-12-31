const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true,
      },
      listingId: {
        type: String,
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
      guests:{
        type:Number,
        required:true,

      }
      // totalPrice: {
      //   type: Number,
      //   required: true,
      // },
      // status: {
      //   type: String,
      //   enum: ['confirmed', 'pending', 'cancelled'],
      //   default: 'pending',
      // },
    }, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
