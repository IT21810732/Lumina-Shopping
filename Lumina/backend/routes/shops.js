// routes/shop.js

const router = require("express").Router();
const Shop = require("../models/Shop");

router.route("/add").post((req, res) => {
    const { productid, productname, category, price, availableqty, suppliername, supplieremail, supplierphone, shopId, shopName } = req.body;
    
    const newShop = new Shop({
        productid,
        productname,
        category,
        price: Number(price),
        availableqty: Number(availableqty),
        suppliername,
        supplieremail,
        supplierphone: Number(supplierphone),
        shopId,
        shopName
    });

    newShop.save()
        .then(() => res.json("Product Added"))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/").get((req, res) => {
    Shop.find()
        .then((shops) => res.json(shops))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/update/:productid").put(async (req, res) => {
    const productid = req.params.productid;
    const { productname, category, price, availableqty, suppliername, supplieremail, supplierphone } = req.body;
    const updateShop = {
        productname,
        category,
        price: Number(price),
        availableqty: Number(availableqty),
        suppliername,
        supplieremail,
        supplierphone: Number(supplierphone)
    };

    await Shop.findOneAndUpdate({ productid }, updateShop)
        .then(() => res.status(200).send({ status: "Product Updated" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/delete/:productid").delete(async (req, res) => {
    const productid = req.params.productid;

    await Shop.findOneAndDelete({ productid })
        .then(() => res.status(200).send({ status: "Product Deleted" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/get/:productid").get(async (req, res) => {
    const productid = req.params.productid;
    
    await Shop.findOne({ productid })
        .then((shop) => res.status(200).send({ status: "User Fetched", shop }))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/get/shop/:shopid").get(async (req, res) => {
    const shopId = req.params.shopid;
    
    await Shop.find({ shopId }) // Query based on shopId
        .then((products) => res.status(200).send(products))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});





module.exports = router;
