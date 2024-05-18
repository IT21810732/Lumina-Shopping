const router = require("express").Router();
let Manager = require("../models/Manager");


router.route("/add").post((req,res)=>{

    const shopid = req.body.shopid;
    const shopname = req.body.shopname;
    const category = req.body.category;
    const phone = Number(req.body.phone);
    const email = req.body.email;
    const shopownerid = req.body.shopownerid;
    const shopownername = req.body.shopownername;
    const rentaltimeperiod = Number(req.body.rentaltimeperiod);
    const rentalprice = req.body.rentalprice;

    const newManager = new Manager({

        shopid,
        shopname,
        category,
        phone,
        email,
        shopownerid,
        shopownername,
        rentaltimeperiod,
        rentalprice

        
    })

    newManager.save().then(()=>{
        res.json("Manager Added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{
     Manager.find().then((managers)=>{
        res.json(managers)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put(async (req, res) =>{
    let userId = req.params.id;
    const {shopid, shopname, category, phone, email, shopownerid,shopownername, rentaltimeperiod, rentalprice} = req.body;

    const updateManager = {
        shopid,
        shopname,
        category,
        phone,
        email,
        shopownerid,
        shopownername,
        rentaltimeperiod,
        rentalprice

    }

    const update = await Manager.findByIdAndUpdate(userId, updateManager)
    .then(() =>{
        res.status(200).send({status: "User updated"}) 
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating date",error: err.message});
    })

})


router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await Manager.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User delete"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error:err.message});
    })

})

router.route("/get/:id").get(async (req, res) =>{
    let userId = req.params.id;
    const user = await Manager.findById(userId)
    .then((manager) => {
        res.status(200).send({status: "User fetched", manager})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })

})


module.exports = router;
