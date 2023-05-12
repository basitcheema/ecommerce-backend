const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.send({categ: "categories"})
})

router.get('/tech', (req, res) => {
    res.send({categ: "tech"})
})

module.exports = router;
