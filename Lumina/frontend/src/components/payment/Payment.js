import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Snackbar } from '@mui/material';

export default function Payment() {
    const { totalPrice } = useParams();
    const { productName, productPrice } = useParams();
    

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add the logic to process the payment
        // For demonstration, let's simulate a successful payment
        setTimeout(() => {
            setPaymentSuccess(true);
            // Navigate to /shoplist after 2 seconds
            setTimeout(() => {
                window.location.href = '/shoplist';
            }, 2000);
        }, 1000);
    };
    

    const handleSnackbarClose = () => {
        setPaymentSuccess(false);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
                <form style={{ margin: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center" style={{ color: '#000', marginBottom: '1rem' }}>Payment Details</Typography>
                    <Typography variant="h6" style={{ color: '#000' }}>Product Name: {productName}</Typography>
                    <Typography variant="h6" style={{ color: '#000' }}>Price: {productPrice}</Typography>
                    <Typography variant="h6" style={{ color: '#000' }}>Total Price: ${totalPrice}</Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        label="Delivery Address"
                        variant="outlined"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        fullWidth
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '1rem' }}>Pay Now</Button>
                </form>
                <Snackbar
                    open={paymentSuccess}
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                    message="Payment Successful!"
                />
            </Grid>
        </Grid>
    );
}
