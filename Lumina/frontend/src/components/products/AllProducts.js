import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AllProducts.css';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        function getProducts() {
            axios.get("http://localhost:8070/shop")
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        getProducts();
    }, []);

    const handleDeleteConfirmation = (productId) => {
        setProductToDelete(productId);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            await axios.delete(`http://localhost:8070/shop/delete/${productToDelete}`);
            setProducts(products.filter(product => product.productid !== productToDelete));
            setProductToDelete(null); 
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.productid.includes(searchTerm) ||
            product.productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Product ID', 'Product Name', 'Category', 'Price', 'Available Quantity', 'Supplier Name', 'Supplier Email', 'Supplier Phone', 'Shop ID', 'Shop Name']],
            body: filteredProducts.map(product => [product.productid, product.productname, product.category, product.price, product.availableqty, product.suppliername, product.supplieremail, product.supplierphone, product.shopId, product.shopName]),
        });
        doc.save('products.pdf');
    };

    return (
        <div className="header1">
            <h1>Product Dashboard</h1>
            <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Product ID, Name, or Category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button onClick={downloadPDF} className="btn btn-download-pdf mb-3">
                Download PDF
            </button>
            <Link to="/availableshops" className="btn btn-primary mb-3">
                Available Shops
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available Quantity</th>
                        <th>Supplier Name</th>
                        <th>Supplier Email</th>
                        <th>Supplier Phone</th>
                        {/* <th>Shop ID</th> */}
                        <th>Shop Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productid}</td>
                            <td>{product.productname}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.availableqty}</td>
                            <td>{product.suppliername}</td>
                            <td>{product.supplieremail}</td>
                            <td>{product.supplierphone}</td>
                            {/* <td>{product.shopId}</td> */}
                            <td>{product.shopName}</td>
                            <td>
                                <Link to={`/update/${product.productid}`} className="btn btn-edit">Edit</Link>
                                <button onClick={() => handleDeleteConfirmation(product.productid)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {productToDelete && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this product?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setProductToDelete(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
