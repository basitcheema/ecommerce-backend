const express = require("express");
const {Order} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// Order.find().then((res) => console.log(res))


module.exports = router;