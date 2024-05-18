import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Container, Button, Grid } from '@mui/material';

export default function AvailableShops() {
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
    <Container maxWidth="md" style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
      <Typography variant="h3" gutterBottom>Available Shops</Typography>
      <List>
        {shops.map(shop => (
          <ListItem key={shop._id} disablePadding style={{ borderBottom: '1px solid #ccc', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemText primary={shop.shopname} style={{ color: '#000', fontWeight: 'bold' }} />
            <Link to={`/add/${shop._id}/${encodeURIComponent(shop.shopname)}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" style={{ borderRadius: '16px', padding: '8px 16px', backgroundColor: '#ff5722', color: '#fff' }}>Add Product</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
