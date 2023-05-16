const express = require("express");
const {Product} = require("../db/db")

const router = express.Router();


router.use(express.json())
router.use(express.urlencoded({extended: true}))

// routes
router.get('/',(req, res) => {
    Product.find().then((response) => res.json(response));
})

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    Product.find({_id: id}).then((response)=> res.json(response));
})


module.exports = router;