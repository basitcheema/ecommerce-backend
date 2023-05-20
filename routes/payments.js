const express = require("express");
const {Payment} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', (req, res) => {
    Payment.find().then((response) => res.json(response));
})

// order id will be returned when order post request is completed
router.post('/', (req,res) => { 
    const orderId = req.body.orderId;
})

module.exports = router;