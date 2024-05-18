const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    productid: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableqty: {
        type: Number,
        required: true
    },
    suppliername: {
        type: String,
        required: true
    }, 
    supplieremail: {
        type: String,
        required: true
    },
    supplierphone: {
        type: Number,
        required: true
    },
    shopId: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    }
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
