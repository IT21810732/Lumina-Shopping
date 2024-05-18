import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Container, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItems() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch cart items from the backend
        axios.get('http://localhost:8070/cart/get')
            .then(res => {
                setCartItems(res.data);
                // Calculate total price when cart items are fetched
                calculateTotalPrice(res.data);
            })
            .catch(err => {
                console.error('Error fetching cart items:', err);
            });
    }, []);

    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.price;
        });
        setTotalPrice(total);
    };

    const handleDeleteItem = (itemId) => {
        // Send delete request to delete item from the cart
        axios.delete(`http://localhost:8070/cart/delete/${itemId}`)
            .then(res => {
                console.log('Item deleted from cart:', res.data);
                // After deleting the item, fetch updated cart items
                axios.get('http://localhost:8070/cart/get')
                    .then(res => {
                        setCartItems(res.data);
                        // Calculate total price when cart items are fetched
                        calculateTotalPrice(res.data);
                    })
                    .catch(err => {
                        console.error('Error fetching cart items:', err);
                    });
            })
            .catch(err => {
                console.error('Error deleting item from cart:', err);
            });
    };

    const handleClearCart = () => {
        // Send delete request to clear all items from the cart
        axios.delete('http://localhost:8070/cart/delete/all')
            .then(res => {
                console.log('Cart cleared:', res.data);
                // After clearing the cart, update the cart items state and total price
                setCartItems([]);
                setTotalPrice(0);
            })
            .catch(err => {
                console.error('Error clearing cart:', err);
            });
    };

    const handleProceedToPay = () => {
        // Navigate to the Payment page
        window.location.href = `/payment/${totalPrice}`;
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom align="center">Cart Items</Typography>
            <Button onClick={handleClearCart} variant="contained" color="error" sx={{ mb: 2 }}>Clear Cart</Button>
            <Button onClick={handleProceedToPay} variant="contained" color="primary" sx={{ mb: 2 }}>Proceed to Pay</Button>
            <Typography variant="h5" gutterBottom align="center" sx={{ color: '#000' }}>Total Price: ${totalPrice}</Typography>
            <Paper elevation={3}>
                <List>
                    {cartItems.map(item => (
                        <React.Fragment key={item._id}>
                            <ListItem disablePadding sx={{ borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '10px 0' }}>
                                <ListItemText
                                    primary={`Product ID: ${item.productid}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography variant="body1" sx={{ color: '#000' }}>{`Name: ${item.productname}`}</Typography>
                                            <Typography variant="body2" color="text.primary" sx={{ color: '#000' }}>{`Price: $${item.price}`}</Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}
