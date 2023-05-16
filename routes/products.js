const express = require("express");
const {Product} = require("../db/db")
const {categories} = require("../db/db")


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

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const img = req.body.img;


    const categoryArr = categories.filter((item) => item.name === category);
    if( categoryArr.length < 1){
        res.send("Category not matched!");
    }
    else {
        const prod = new Product({name, description, quantity, category: categoryArr[0], img});
        prod.save();
        res.send("Succesfuly Added Product!");
    }
    


});


module.exports = router;