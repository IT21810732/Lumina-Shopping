const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productid: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: false
    },
   
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
