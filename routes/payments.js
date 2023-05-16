const express = require("express");
const {Payment} = require("../db/db")

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', (req, res) => {
    Payment.find().then((response) => res.json(response));
})

module.exports = router;