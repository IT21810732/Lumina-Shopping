import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios'; // Import Axios for HTTP requests
import './Booking.css'; // Ensure this is correctly linked

const Booking = ({ setCode }) => {
    const [email, setEmail] = useState('');
    const [movie, setMovie] = useState('');
    const [message, setMessage] = useState(''); // Use to display messages to the user

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMovieChange = (event) => {
        setMovie(event.target.value);
    };

    const handleSubmit = async (event) => { // Update to async function
        event.preventDefault();

        // Generate a random code (you can use any logic you prefer)
        const code = Math.random().toString(36).substr(2, 9); // Example code generation

        // Update message to indicate loading
        setMessage("Sending your ticket and code...");

        const bookingData = {
            email: email,
            movie: movie,
            code: code,
        };

        try {
            // Send data to backend API for saving to database
            const response = await axios.post('http://localhost:8070/api/bookings/', bookingData);
            console.log('Booking saved:', response.data);
            
            // Send email using EmailJS (your existing code)
            const serviceId = 'service_a580a6g';
            const templateId = 'template_mgtk62d';
            const userId = 'smzca73w_kWoo5lu-';

            const templateParams = {
                email: email,
                movie: movie,
                code: code,
                to_email: email
            };

            await emailjs.send(serviceId, templateId, templateParams, userId);
            console.log('Email sent successfully!');

            // Update UI message
            setMessage('Ticket and code sent successfully! Check your email.');
            setCode(code); // Set the generated code in parent component state
        } catch (error) {
            console.error('Error saving booking:', error);
            setMessage('Failed to send ticket and code. Please try again.');
        }
    };

    return (
        <div className='booking-container'>
            <h1 className='booking-title'>Buy Your Movie Ticket</h1>
            <form className='booking-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email" className='form-label'>Your Email:</label>
                    <input type="email" id="email" className='form-input' value={email} onChange={handleEmailChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="movie" className='form-label'>Select Movie:</label>
                    <select id="movie" className='form-select' value={movie} onChange={handleMovieChange} required>
                        <option value="">Select a Movie</option>
                        <option value="Inception">Inception</option>
                        <option value="Interstellar">Interstellar</option>
                        <option value="The Matrix">The Matrix</option>
                        <option value="Avengers: Endgame">Avengers: Endgame</option>
                    </select>
                </div>
                <button className='submit-button' type="submit">Buy Ticket</button>
                <div className='message'>{message}</div> {/* Displays feedback message */}
            </form>
        </div>
    );
};

export default Booking;
