import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './AllShops.css';

export default function UpdateShop() {
    const { id } = useParams(); 
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
    const [updateSuccess, setUpdateSuccess] = useState(false); 

    useEffect(() => {
        
        axios.get(`http://localhost:8070/manager/get/${id}`)
            .then((res) => {
                const shopData = res.data.manager;
                setFormData(shopData);
            })
            .catch((err) => {
                console.error("Error fetching shop data:", err);
            });
    }, [id]);

    const updateShop = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8070/manager/update/${id}`, formData)
            .then(() => {
                setUpdateSuccess(true);
            })
            .catch((err) => {
                alert("Error updating shop: " + err.message);
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
        <div className="container" style={{ maxWidth: "500px", margin: "auto" }}>
            <h2>Update Shop</h2>
            <form onSubmit={updateShop}>
                <div className="form-group">
                    <label htmlFor="shopid" style={{ color: 'black' }}>Shop ID</label>
                    <input type="text" className="form-control" id="shopid" name="shopid" value={formData.shopid} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="shopname">Shop Name</label>
                    <input type="text" className="form-control" id="shopname" name="shopname" value={formData.shopname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="shopownerid">Shop Owner ID</label>
                    <input type="text" className="form-control" id="shopownerid" name="shopownerid" value={formData.shopownerid} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="shopownername">Shop Owner Name</label>
                    <input type="text" className="form-control" id="shopownername" name="shopownername" value={formData.shopownername} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="rentaltimeperiod">Rental Time Period</label>
                    <input type="text" className="form-control" id="rentaltimeperiod" name="rentaltimeperiod" value={formData.rentaltimeperiod} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="rentalprice">Rental Price</label>
                    <input type="text" className="form-control" id="rentalprice" name="rentalprice" value={formData.rentalprice} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

            {updateSuccess && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Success</h5>
                            </div>
                            <div className="modal-body">
                                Shop updated successfully!
                            </div>
                            <div className="modal-footer">
                                <Link to="/shops" className="btn btn-primary" onClick={() => setUpdateSuccess(false)}>OK</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
