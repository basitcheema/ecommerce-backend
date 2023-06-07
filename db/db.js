const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerceDB");

const categories = [{name: "Tech", id: 1}, {name: "Clothing", id: 2}, {name: "Sports", id: 3}];

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
    status: {
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

const date = new Date();

module.exports = {Product, Payment, Order, categories};


