const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Assuming you have a Booking model

router.post('/bookings', async (req, res) => {
    try {
        const { email, movie, code } = req.body;
        const booking = new Booking({ email, movie, code });
        await booking.save();
        res.status(201).json({ message: 'Booking saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/check-code', async (req, res) => {
    const enteredCode = req.body.code.toLowerCase().trim(); // Convert to lowercase and trim whitespace

    try {
        const booking = await Booking.findOne({ code: enteredCode });

        if (booking) {
            res.status(200).json({ message: 'Code found in database. Access granted.' });
        } else {
            res.status(404).json({ message: 'Code not found in database. Access denied.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
