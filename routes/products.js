const express = require("express");
const {Product} = require("../db/db")

const router = express.Router();


router.use(express.json())
router.use(express.urlencoded({extended: true}))




router.get('/',(req, res) => {
    
    Product.find().then((response) => res.json(response));
})

module.exports = router;