import React, { useState, useEffect } from 'react';
import './SpinnerGame.css';
import BuyCoins from './BuyCoins';
import { jsPDF } from "jspdf";

function SpinnerGame() {
    const [rotation, setRotation] = useState(0);
    const [availableSpins, setAvailableSpins] = useState(0);
    const prizes = ["V1", "No Prize", "V2", "No Prize", "V3"];
    const [prizeIndex, setPrizeIndex] = useState(null);
    const [showBuyCoins, setShowBuyCoins] = useState(false);
    const [collected, setCollected] = useState(true);

    const spinWheel = () => {
        if (availableSpins > 0 && collected) {
            const newRotation = Math.floor(Math.random() * 360) + rotation + 720;
            setRotation(newRotation);
            setAvailableSpins(availableSpins - 1);
            setCollected(false);
            setTimeout(() => {
                const index = Math.floor(((newRotation % 360) / 360) * prizes.length);
                setPrizeIndex(index);
                if (prizes[index] === "No Prize") {
                    setCollected(true);
                }
            }, 4000);
        }
    };

    const collectPrize = () => {
        const voucherCode = `VCHR-${Math.random().toString(36).substr(2, 9)}`;
        alert(`Collecting your prize: ${prizes[prizeIndex]} - Code: ${voucherCode}`);
    
        // Initialize jsPDF
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });
    
        // Set background and rectangle for the voucher details
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const rectWidth = 160; // width of the rectangle
        const rectHeight = 80; // height of the rectangle
        const rectX = (pageWidth - rectWidth) / 2; // center the rectangle
        const rectY = (pageHeight - rectHeight) / 2; // center the rectangle
    
        doc.rect(rectX, rectY, rectWidth, rectHeight, 'F');
    
        // Load logo image
        const logoData = '/images/lumina.png';
        doc.addImage(logoData, 'JPEG', rectX + 5, rectY + 5, 40, 20);
    
        // Add text with white color inside the rectangle
        doc.setTextColor(255, 255, 255); // RGB for white
        doc.setFontSize(12);
        doc.text("LUMINA SHOPPING MALL", rectX + 50, rectY + 15);
        doc.setFontSize(10);
        doc.text(`Prize: ${prizes[prizeIndex]}`, rectX + 50, rectY + 25);
        doc.text(`Voucher Code: ${voucherCode}`, rectX + 50, rectY + 35);
    
        // Save the PDF
        doc.save("voucher.pdf");
    
        setCollected(true);
    };
    

    return (
        <div className="spinner-container">
            {showBuyCoins ? (
                <BuyCoins onBuy={(spins) => {
                    setAvailableSpins(availableSpins + spins);
                    setShowBuyCoins(false);
                }} />
            ) : (
                <>
                    <div className="spinner" style={{ transform: `rotate(${rotation}deg)` }}>
                        {prizes.map((prize, index) => (
                            <div key={index} className="spinner-segment" style={{ transform: `rotate(${index * (360 / prizes.length)}deg)` }}>
                                {prize}
                            </div>
                        ))}
                    </div>
                    <button className="spin-button" onClick={spinWheel} disabled={availableSpins === 0 || !collected}>Spin ({availableSpins} left)</button>
                    <button style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '0 10px' }} onClick={() => setShowBuyCoins(true)}>Buy Coins</button>
                    {prizeIndex !== null && prizes[prizeIndex] !== "No Prize" && !collected && (
                        <button style={{ background: '#3498db', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={collectPrize}>Collect Your Prize</button>
                    )}
                </>
            )}
        </div>
    );
}

export default SpinnerGame;
