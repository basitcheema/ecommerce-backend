const express = require("express");
const {Order} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// Order.find().then((res) => console.log(res))
router.get("/", (req, res) => {
    Order.find().then((response) => res.json(response));
})

router.get('/:id', (req, res) => {
    Order.find({_id: id}).then((response) => res.json(response));
})


module.exports = router;