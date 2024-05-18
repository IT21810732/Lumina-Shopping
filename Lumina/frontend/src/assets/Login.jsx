import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8070/login', { email, password })
            .then(res => {
                console.log(res);
                if (res.data.Login) {
                    const { role } = res.data;
                    console.log("Role:", role); // Check the role received
                    if (role === 'visitor') {
                        console.log("Navigating to /shoplist");
                        navigate('/shoplist'); // Redirect visitors to '/shoplist'
                    } else if (role === 'shop_owner') {
                        console.log("Navigating to /addshop");
                        navigate('/shops'); // Redirect shop owners to '/addshop'
                    } else if (role === 'product_manager') {
                        console.log("Navigating to /");
                        navigate('/products'); // Redirect product managers to '/add'
                    } else if (role === 'employee_manager') {
                        console.log("Navigating to /ehome");
                        navigate('/ehome'); // Redirect employee managers to '/emplist'
                    }
                    else if (role === 'employee') {
                        console.log("Navigating to /ehome");
                        navigate('/viewemp/:id'); // Redirect employee managers to '/emplist'
                    }
                } else {
                    alert('Login failed');
                }
            })
            .catch(err => console.log(err));
    };

    const handleRegister = () => {
        navigate('/register');
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
                <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333', fontSize: '24px' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', transition: 'border-color 0.3s' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', transition: 'border-color 0.3s' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#FF0404', transition: 'background-color 0.3s' }}>
                        Login
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>Don't Have an Account? <span style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleRegister}>Register</span></p>
            </div>
        </div>
    );
};

export default Login;
