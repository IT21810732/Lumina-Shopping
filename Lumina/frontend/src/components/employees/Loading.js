import React from 'react';
import './Loading.css'; // Make sure to create a corresponding CSS file for styles
import logo from '../../../src/lumina.png'; // Adjust the path to your logo image

const Loading = () => {
    return (
        <div className="loading-container">
            <img src={logo} alt="Loading..." className="rotating-logo" />
        </div>
    );
};

export default Loading;
