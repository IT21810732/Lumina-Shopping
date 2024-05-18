import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const HomePage = () => {
    const shops = [
        { id: 1, name: 'Mens Clothing', imageUrl: '/images/mens.PNG' },
        { id: 2, name: 'Womens Clothing', imageUrl: '/images/womens.jpg' },
        { id: 3, name: 'Kids Clothing', imageUrl: '/images/kids.jpg' },
        { id: 4, name: 'Footwear', imageUrl: '/images/footware.jpeg' },
        { id: 5, name: 'Accessories', imageUrl: '/images/accessories.webp' },
        { id: 6, name: 'Gift Items', imageUrl: '/images/gift.jpg' },
    ];

   

    return (
        <div className="home-page">
            <h1>Product Categories</h1>
            <div className="shop-grid">
                {shops.map((shop) => (
                    <Link to="/add" key={shop.id} className="shop-card">
                        <img src={shop.imageUrl} alt={shop.name} />
                        <h3>{shop.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
