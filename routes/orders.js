const express = require("express");
const {Order, Product} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get("/", (req, res) => {
    Order.find().then((response) => res.json(response));
})

router.get('/:id', (req, res) => {
    Order.find({_id: id}).then((response) => res.json(response));
})


router.post('/', (req, res) => {
    const prodIds = req.body.productIds;
    const quantity = req.body.quantity;
    const date = new Date().toLocaleString();
    const status = "payment-pending";

    console.log(prodIds, quantity, date, status);

    // return order id & save order to db!
    Product.findById(prodIds).then((response) => {
        console.log("ID found: ",response._id)
        const newOrder = new Order({status, date, quantity, prodId: []});
        newOrder.save();
        res.json({orderId: newOrder._id,message: "Added Order. Proceed To Payment"})

    }).catch((error) => {
        console.log("Error!, No Product with ID Found");
        res.status(400).send("Error!, No Product with ID Found")
    })


})

module.exports = router;