const express = require("express");
const router = express.Router();




router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get('/', (req, res) => {
    res.send({"cart":"req received!"})
})

router.post('/', (req, res) => {
    const id = req.body.cartId;

        
})


module.exports = router;