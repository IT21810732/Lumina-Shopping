const router = require("express").Router();
const Cart = require("../models/Cart");

// Route to add an item to the cart
router.route("/add").post((req, res) => {
    const { productid, productname, price, qty } = req.body;

    const newItem = new Cart({
        productid,
        productname,
        price,
        qty
    });

    newItem.save()
        .then(() => {
            res.json("Item added to cart");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error adding item to cart");
        });
});

// Route to get all items in the cart
router.route("/get").get((req, res) => {
    Cart.find()
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error fetching items from cart");
        });
});

// Route to update an item in the cart
router.route("/update/:id").put(async (req, res) => {
    const itemId = req.params.id;
    const { productid, productname, price, qty } = req.body;

    const updateItem = {
        productid,
        productname,
        price,
        qty
    };

    try {
        await Cart.findByIdAndUpdate(itemId, updateItem);
        res.json("Item updated");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error updating item in cart");
    }
});

// Route to remove an item from the cart
router.route("/delete/:id").delete(async (req, res) => {
    const itemId = req.params.id;

    try {
        await Cart.findByIdAndDelete(itemId);
        res.json("Item deleted from cart");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error deleting item from cart");
    }
});

// Route to get a specific item from the cart
router.route("/get/:id").get(async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await Cart.findById(itemId);
        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error fetching item from cart");
    }
});


router.route("/delete/all").delete(async (req, res) => {
    try {
        await Cart.collection.drop(); // Drop the entire Cart collection
        res.json("Cart cleared");
    } catch (err) {
        console.error('Error clearing cart:', err);
        res.status(500).json("Error clearing cart");
    }
});





module.exports = router;
