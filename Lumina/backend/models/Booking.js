// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
