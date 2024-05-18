import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ViewProducts() {
    const [products, setProducts] = useState([]);
    const { shopId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/shop/get/shop/${shopId}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
            });
    }, [shopId]);

    const handleBuyNow = (productName, productPrice) => {
        const encodedProductName = encodeURIComponent(productName);
        const encodedProductPrice = encodeURIComponent(productPrice);
        window.location.href = `/payment/${encodedProductName}/${encodedProductPrice}`;
    };

    const handleAddToCart = (product) => {
        axios.post('http://localhost:8070/cart/add', product)
            .then(res => {
                console.log('Item added to cart:', res.data);
            })
            .catch(err => {
                console.error('Error adding item to cart:', err);
            });
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>Products in this Shop</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Link to="/cartitems" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#3f51b5', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Cart</button>
                </Link>
            </div>
            {products.map((product, index) => (
                <div key={product._id} style={{ border: '1px solid #e0e0e0', borderRadius: '10px', marginBottom: '20px', backgroundColor: '#fff', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#000' }}>ProductID: {product.productid}</p>
                    <p style={{ color: '#000' }}>Name: {product.productname}</p>
                    <p style={{ color: '#000' }}>Category: {product.category}</p>
                    <p style={{ color: '#000' }}>Price: ${product.price}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button onClick={() => handleBuyNow(product.productname, product.price)} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#4caf50', color: '#ffffff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Buy Now</button>
                        <button onClick={() => handleAddToCart(product)} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#f44336', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
