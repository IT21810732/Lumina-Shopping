import React from 'react';
import './Footer.css'; // Make sure the CSS file path is correct

const Footer = () => {
    return (
        <footer className="mall-footer">
            <div className="footer-content">
                <h3>LUMINA</h3>
                <p>1234 Shopping Mall Road<br/>City, State, 12345</p>
                <p>Email: contact@shoppingmall.com<br/>Phone: (123) 456-7890</p>
                <div className="social-media-icons">
                    <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                    <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
