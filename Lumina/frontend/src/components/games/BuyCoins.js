import React from 'react';
import './BuyCoins.css'; // Assuming you have a separate CSS file for this page

function BuyCoins({ onBuy }) {
    const handleBuyCoins = (spins) => {
        // Logic for buying coins should go here
        alert(`Coins purchased successfully! You have ${spins} more spins.`);
        onBuy(spins);
    };

    return (
        <div className="buy-coins-container">
            <h1>Buy Coins</h1>
            <div className="coin-options">
                <div className="coin-option" onClick={() => handleBuyCoins(1)}>
                    <h2>1 Coin</h2>
                    <p>$1.00</p>
                </div>
                <div className="coin-option" onClick={() => handleBuyCoins(2)}>
                    <h2>2 Coins</h2>
                    <p>$2.00</p>
                </div>
                <div className="coin-option" onClick={() => handleBuyCoins(5)}>
                    <h2>5 Coins</h2>
                    <p>$5.00</p>
                </div>
                {/* Add more options as needed */}
            </div>
        </div>
    );
}


export default BuyCoins;
