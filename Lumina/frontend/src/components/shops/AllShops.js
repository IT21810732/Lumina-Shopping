import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AllShops.css';

export default function AllShops() {
    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [productToDelete, setProductToDelete] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [totalRentalPrice, setTotalRentalPrice] = useState(0);

    useEffect(() => {
        function getShops() {
            axios.get("http://localhost:8070/manager/")
                .then((res) => {
                    setShops(res.data);
                    setFilteredShops(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getShops();
    }, []);

    useEffect(() => {
        calculateTotalRentalPrice();
    }, [filteredShops]);

    const calculateTotalRentalPrice = () => {
        const total = filteredShops.reduce((acc, shop) => acc + parseFloat(shop.rentalprice), 0);
        setTotalRentalPrice(total);
    };

    const handleDeleteConfirmation = (product) => {
        setProductToDelete(product);
    };

    const handleDelete = () => {
        if (productToDelete) {
            axios.delete(`http://localhost:8070/manager/delete/${productToDelete._id}`)
                .then(() => {
                    setShops(shops.filter(shop => shop._id !== productToDelete._id));
                    setFilteredShops(filteredShops.filter(shop => shop._id !== productToDelete._id));
                    setProductToDelete(null);
                    setDeleteSuccess(true); 
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const filtered = shops.filter(shop => {
            return (
                shop.shopid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shop.shopname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shop.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredShops(filtered);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Shop ID', 'Shop Name', 'Category', 'Phone', 'Email', 'Shop Owner ID', 'Shop Owner Name', 'Rental Time Period', 'Rental Price']],
            body: filteredShops.map(shop => [shop.shopid, shop.shopname, shop.category, shop.phone, shop.email, shop.shopownerid, shop.shopownername, shop.rentaltimeperiod, shop.rentalprice])
        });
        
        window.open(doc.output('bloburl'), '_blank');
    };

    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-5">All Shops</h1>

            <div className="row mb-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Shop ID, Name, or Category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-success btn-block btn-download-pdf" onClick={handleDownloadPDF}>Download PDF</button>
                </div>
            </div>

            <div className="mb-3">
                <Link to="/addshop" className="btn btn-primary">Add Shop</Link>
            </div>

            <div className="mb-3">
                <p style={{ color: 'black' }}>Total Rental Price: {totalRentalPrice}</p>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Shop ID</th>
                        <th>Shop Name</th>
                        <th>Category</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Shop Owner ID</th>
                        <th>Shop Owner Name</th>
                        <th>Rental Time Period</th>
                        <th>Rental Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShops.map((shop) => (
                        <tr key={shop._id}>
                            <td>{shop.shopid}</td>
                            <td><Link to={`/viewproduct/${shop._id}`}>{shop.shopname}</Link></td>
                            <td>{shop.category}</td>
                            <td>{shop.phone}</td>
                            <td>{shop.email}</td>
                            <td>{shop.shopownerid}</td>
                            <td>{shop.shopownername}</td>
                            <td>{shop.rentaltimeperiod}</td>
                            <td>{shop.rentalprice}</td>
                            <td>
                                <Link to={{ pathname: `/updateshop/${shop._id}`, state: { shop } }} className="btn btn-primary mr-2">Edit</Link>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteConfirmation(shop)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {productToDelete && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setProductToDelete(null)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this shop?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setProductToDelete(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteSuccess && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: 'red' }}>Deletion Success</h5>
                                <button type="button" className="btn-close" onClick={() => setDeleteSuccess(false)}></button>
                            </div>
                            <div className="modal-body" style={{ color: 'red' }}>
                                Shop deleted successfully!
                            </div>
                            <div className="modal-footer">
                                <Link to="/shops" className="btn btn-primary" onClick={() => setDeleteSuccess(false)}>OK</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
