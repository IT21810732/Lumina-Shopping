import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function UpdateProduct() {
  const [product, setProduct] = useState({
    productid: "",
    productname: "",
    category: "",
    price: "",
    availableqty: "",
    suppliername: "",
    supplieremail: "",
    supplierphone: ""
  });

  const { productid } = useParams();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/shop/get/${productid}`);
        const { shop } = response.data;
        setProduct(shop);
      } catch (error) {
        alert("Error fetching product details: " + error.message);
      }
    };

    fetchProductDetails();
  }, [productid]);

  const sendData = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productid: product.productid,
      productname: product.productname,
      category: product.category,
      price: parseFloat(product.price),
      availableqty: parseInt(product.availableqty),
      suppliername: product.suppliername,
      supplieremail: product.supplieremail,
      supplierphone: parseFloat(product.supplierphone)
    };

    try {
      await axios.put(`http://localhost:8070/shop/update/${productid}`, updatedProduct);
      setUpdateSuccess(true);
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Update Product</h2>
              <form onSubmit={sendData}>
                <div className="mb-3">
                  <label htmlFor="productId" className="form-label">Product ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productId"
                    name="productId"
                    value={product.productid}
                    onChange={(e) => setProduct({ ...product, productid: e.target.value })}
                    placeholder="Enter product ID"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    value={product.productname}
                    onChange={(e) => setProduct({ ...product, productname: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="availableQty" className="form-label">Available Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="availableQty"
                    name="availableQty"
                    value={product.availableqty}
                    onChange={(e) => setProduct({ ...product, availableqty: e.target.value })}
                    placeholder="Enter available quantity"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierName"
                    name="supplierName"
                    value={product.suppliername}
                    onChange={(e) => setProduct({ ...product, suppliername: e.target.value })}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierEmail" className="form-label">Supplier Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="supplierEmail"
                    name="supplierEmail"
                    value={product.supplieremail}
                    onChange={(e) => setProduct({ ...product, supplieremail: e.target.value })}
                    placeholder="Enter supplier email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierPhone" className="form-label">Supplier Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierPhone"
                    name="supplierPhone"
                    value={product.supplierphone}
                    onChange={(e) => setProduct({ ...product, supplierphone: e.target.value })}
                    placeholder="Enter supplier phone"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
              {/* Update Success Modal */}
              {updateSuccess && (
                <div className="modal" style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Update Successful</h5>
                      </div>
                      <div className="modal-body">
                        <p>The product has been updated successfully.</p>
                      </div>
                      <div className="modal-footer">
                        <Link to="/products" className="btn btn-primary">OK</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
