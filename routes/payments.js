const express = require("express");
const {Payment, Order} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', (req, res) => {
    Payment.find().then((response) => res.json(response));
})


router.post('/', (req,res) => { 
    const orderId = req.body.orderId;
    const status = req.body.status;
    const method = req.body.method;
    if(status === "success"){
        Order.findById(orderId).then((response) => {
            const payment = new Payment({status, orderId: response._id, method});
            Order.findByIdAndUpdate(orderId, {status: "Delivery-pending"}).then((response) => {
                payment.save();
                res.send("Payment Successfully Added & Order Updated!")
                console.log("Payment Successfully Added & Order Updated!")
            })
        }).catch((error) => {
            console.log("Error! Order with ID not Found")
            res.status(400).send("Order with ID not Found!")
        })
        
    }

})

module.exports = router;