import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AddShop() {
    const [formData, setFormData] = useState({
        shopid: "",
        shopname: "",
        category: "",
        phone: "",
        email: "",
        shopownerid: "",
        shopownername: "",
        rentaltimeperiod: "",
        rentalprice: ""
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const sendData = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8070/manager/add", formData)
            .then(() => {
                setSuccessMessage(true);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40vh',
            flexDirection: 'column',
            backgroundColor: '#f0f0f0',
        }}>
            <div className="container" style={{
                maxWidth: "500px",
                margin: "0 auto",
                border: "2px solid red",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,.2)"
            }}>
                <h2 style={{ textAlign: "center", color: "red" }}>Add Shop</h2>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label htmlFor="shopid" style={{ color: 'black' }}>Shop ID</label>
                        <input type="text" className="form-control" id="shopid" name="shopid" value={formData.shopid} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shopname" style={{ color: 'black' }}>Shop Name</label>
                        <input type="text" className="form-control" id="shopname" name="shopname" value={formData.shopname} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" style={{ color: 'black' }}>Category</label>
                        <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" style={{ color: 'black' }}>Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" style={{ color: 'black' }}>Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shopownerid" style={{ color: 'black' }}>Shop Owner ID</label>
                        <input type="text" className="form-control" id="shopownerid" name="shopownerid" value={formData.shopownerid} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shopownername" style={{ color: 'black' }}>Shop Owner Name</label>
                        <input type="text" className="form-control" id="shopownername" name="shopownername" value={formData.shopownername} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rentaltimeperiod" style={{ color: 'black' }}>Rental Time Period</label>
                        <input type="text" className="form-control" id="rentaltimeperiod" name="rentaltimeperiod" value={formData.rentaltimeperiod} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rentalprice" style={{ color: 'black' }}>Rental Price</label>
                        <input type="text" className="form-control" id="rentalprice" name="rentalprice" value={formData.rentalprice} onChange={handleChange} style={{ color: 'black' }} />
                    </div>
                    <button type="submit" style={{
                        width: "100%",
                        backgroundColor: "black",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>Submit</button>
                </form>
            </div>

            {successMessage && (
                <div className="modal" style={{
                    display: 'block',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '2px solid red',
                    borderRadius: '5px',
                    zIndex: 1050,
                }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: 'red' }}>Success</h5>
                        </div>
                        <div className="modal-body" style={{ color: 'red' }}>
                            Shop added successfully!
                        </div>
                        <div className="modal-footer">
                            <Link to="/shops" className="btn" style={{
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '10px 20px',
                                textDecoration: 'none',
                                borderRadius: '5px',
                            }}>Close</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
