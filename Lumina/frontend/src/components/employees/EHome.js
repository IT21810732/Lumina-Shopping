import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EHome.css'; // Ensure this CSS file is created and correctly linked
import Loading from './Loading'; // Import the Loading component

const HomePage = () => {
    const shops = [
        { id: 1, name: 'Fashion Store', imageUrl: '/images/employee/Fashion.jpg' },
        { id: 2, name: 'Electronics', imageUrl: '/images/employee/electro.jpg' },
        { id: 3, name: 'Home & Living', imageUrl: '/images/employee/hmm.jpg' },
        { id: 4, name: 'Gourmet Foods', imageUrl: '/images/employee/foods.jpg' },
        { id: 5, name: 'Sporting Goods', imageUrl: '/images/employee/sports.jpg' },
        { id: 6, name: 'Books & Stationery', imageUrl: '/images/employee/books.jpg' },
    ];

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust the delay as needed
  
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="home-page">
            <h1>Add Employees For Shops</h1>
            <div className="shop-grid">
                {shops.map((shop) => (
                    <Link to="/addemp" key={shop.id} className="shop-card">
                        <img src={shop.imageUrl} alt={shop.name} />
                        <h3>{shop.name}</h3>
                    </Link>
                ))}
            </div>
            {/* Employee List Button */}
            <button onClick={() => { window.location.href = '/emplist' }} className="employee-list-button" style={{ backgroundColor: 'maroon', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
                Employee List
            </button>
        </div>
    );
};

export default HomePage;
