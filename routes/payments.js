const express = require("express");
const {Payment, Order} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', (req, res) => {
    Payment.find().then((response) => res.json(response));
})

// order id will be returned when order post request is completed
router.post('/', (req,res) => { 
    const orderId = req.body.orderId;
    const status = req.body.status;
    const method = req.body.method;
    if(status === "success"){
        try{
        Order.findById(orderId).then((response) => {
            // if orderId match then proceed else res.send not found!
            const payment = new Payment({status, orderId: response._id, method});
            Order.findByIdAndUpdate(orderId, {status: "Delivery-pending"}).then((response) => {
                payment.save();
                console.log(response);
                res.send("Payment Successfully Added & Order Updated!")
            })
        })
        
        }
        catch(error){
            console.log("Error!");
        }
    }

})

module.exports = router;