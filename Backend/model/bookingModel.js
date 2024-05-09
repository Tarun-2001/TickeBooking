const mongoose = require('mongoose');

const screens = {
    values: ['Screen 1', 'Screen 2', 'Screen 3', 'Screen 4'],
    message: 'Invalid screen selection'
  };

const bookingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      required: true
    },
    screen: {
      type: String,
      enum: screens,
      required: true
    },
    bookedSeats: {
      type: [Number],
      required: true
    }
  });

const Booking = mongoose.model('bookingModel', bookingSchema);
module.exports = Booking;
