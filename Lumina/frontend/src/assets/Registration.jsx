import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8070/register', { name, email, password })
            .then(res => {
                alert("Created");
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url('/images/sf.jpg')`, // Path to the background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div style={{ backgroundColor: '#fff', width: '400px', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333', fontSize: '24px' }}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', transition: 'border-color 0.3s', fontSize: '16px' }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', transition: 'border-color 0.3s', fontSize: '16px' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', transition: 'border-color 0.3s', fontSize: '16px' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#FF0404', transition: 'background-color 0.3s', fontSize: '16px' }}>
                        Register
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '16px' }}>Already Have an Account? <span style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleLogin}>Login</span></p>
            </div>
        </div>
    );
};

export default Registration;
