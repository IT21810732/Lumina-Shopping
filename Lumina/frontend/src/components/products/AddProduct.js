import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './AddProducts.css';

export default function AddProduct() {
  // State variables for attributes
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [availableQty, setAvailableQty] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Use useParams hook to get the shopId and shopName from the URL
  const { shopId, shopName } = useParams();

  function sendData(e) {
    e.preventDefault();
  
    const newProduct = {
      productid: productId,
      productname: productName,
      category,
      price: parseFloat(price),
      availableqty: parseInt(availableQty),
      suppliername: supplierName,
      supplieremail: supplierEmail,
      supplierphone: parseFloat(supplierPhone),
      shopId: shopId, // Include shopId
      shopName: decodeURIComponent(shopName) // Include shopName
    };
    
    axios
      .post("http://localhost:8070/shop/add", newProduct)
      .then(() => {
        setShowModal(true);
        resetForm();
      })
      .catch((err) => {
        alert(err);
      });
    
  }
  

  function resetForm() {
    setProductId("");
    setProductName("");
    setCategory("");
    setPrice("");
    setAvailableQty("");
    setSupplierName("");
    setSupplierEmail("");
    setSupplierPhone("");
  }

  function handleOK() {
    setShowModal(false);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {/* Confirmation Modal */}
              {showModal && (
                <div className="modal" style={{ display: "block" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Product Added</h5>
                      </div>
                      <div className="modal-body">
                        <p>Product has been successfully added!</p>
                      </div>
                      <div className="modal-footer">
                        <Link to="/products" className="btn btn-primary" onClick={handleOK}>
                          OK
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={sendData}>
                {/* ShopName */}
                <div className="mb-3">
                  <label htmlFor="shopName" className="form-label">
                    ShopName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shopName"
                    name="shopName"
                    value={decodeURIComponent(shopName)}
                    disabled
                  />
                </div>
                {/* Rest of the form */}
                <div className="mb-3">
                  <label htmlFor="productId" className="form-label">
                    Product ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productId"
                    name="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter product ID"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="availableQty" className="form-label">
                    Available Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="availableQty"
                    name="availableQty"
                    value={availableQty}
                    onChange={(e) => setAvailableQty(e.target.value)}
                    placeholder="Enter available quantity"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierName" className="form-label">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierName"
                    name="supplierName"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierEmail" className="form-label">
                    Supplier Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="supplierEmail"
                    name="supplierEmail"
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                    placeholder="Enter supplier email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierPhone" className="form-label">
                    Supplier Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierPhone"
                    name="supplierPhone"
                    value={supplierPhone}
                    onChange={(e) => setSupplierPhone(e.target.value)}
                    placeholder="Enter supplier phone"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
