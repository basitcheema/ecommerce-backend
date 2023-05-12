const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerceDB");

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

console.log("DB Js");

const categories = [{name: "Tech", id: 1}, {name: "Clothing", id: 2}, {name: "Sports", id: 3}];

//validation in schema

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    category: {
        type: Object, 
        required: true
    },
    // store img using url of uploaded img
    img: {
        type: String,
        required: true
    }

})
const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String, 
        required: true
    },
    quantity: { 
        type: Number,
        min: [1, "Please Enter Atleast 1 Item!"],
        required: true
    },

    date: {
        type: Date,
        required: true
    }, 
    prodId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: Product
    }]
})
const Order = mongoose.model("Order", orderSchema);

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Order,
    },
    status: {
        type: String, 
        required: true
    },
    method: {
        type: String, 
        required: true
    },

})


const Payment = mongoose.model("Payment", paymentSchema);

// reference order -- payment
orderSchema.path('prodId').ref(Product);
paymentSchema.path('orderId').ref(Order);

// console.log(orderSchema.paths.prodId)
// console.log(paymentSchema.paths.orderId)


// Product.find().then(function(products){
//     console.log("products");

// })
const date = new Date();


// Adding Products

// const prod = new Product({name:"headphone", quantity: 5, description: "apple headphones", category: categories[0], img: "empty"})
// prod.save();

let prod;
Product.find().then((res) => {
    prod = res
    const order1 = new Order({customerName: "Ali", quantity:1, date: date, prodId: prod});
    // order1.save();
})

// Adding orders 


  // taking input in nodejs
//   readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`);
//     readline.close();
//   });
  


module.exports = {Product, Payment, Order};


