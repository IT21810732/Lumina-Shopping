import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Button } from '@mui/material';

export default function ShopList() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/manager/')
            .then(res => {
                setShops(res.data);
            })
            .catch(err => {
                console.error('Error fetching shops:', err);
            });
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4, p: 2 }}>
            {/* Buttons */}
            <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '20px' }}>
                <Grid item>
                    <Button component={Link} to="/player" variant="contained" sx={{ bgcolor: '#800000', color: 'white' }}>
                        Watch Movie
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={Link} to="/movies" variant="contained" sx={{ bgcolor: '#800000', color: 'white' }}>
                        Book Movie
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={Link} to="/playgames" variant="contained" sx={{ bgcolor: '#800000', color: 'white' }}>
                        Play Games
                    </Button>
                </Grid>
            </Grid>
            {/* All Shops Heading */}
            <Typography variant="h3" align="center" gutterBottom style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                All Shops
            </Typography>
            {/* Shop List */}
            <Grid container spacing={3}>
                {shops.map((shop, index) => (
                    <Grid item key={shop._id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardActionArea component={Link} to={`/viewproducts/${shop._id}`}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                        {shop.shopname}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
