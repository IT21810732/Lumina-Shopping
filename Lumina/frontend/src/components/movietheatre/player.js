import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './player.css';

const Player = () => {
    const [enteredCode, setEnteredCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Use the useNavigate hook

    const handleCodeChange = (event) => {
        setEnteredCode(event.target.value);
    };

    const handleWatchClick = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/check-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: enteredCode })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                console.log('Playing the movie...');
                navigate('/mp'); // Navigate to the movie watch page on success
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: Failed to check code.');
        }
    };

    return (
        <div className='player-container'>
            <h1 className='player-title'>Enter Code to Watch Movie</h1>
            <input type="text" className='code-input' value={enteredCode} onChange={handleCodeChange} placeholder="Enter code" />
            <button className='watch-button' onClick={handleWatchClick}>Watch Movie</button>
            <div className='message'>{message}</div>
        </div>
    );
};

export default Player;
