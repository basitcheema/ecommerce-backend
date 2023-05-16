const express = require("express");
const cors = require("cors");
const categoriesRoute = require("./routes/categories")
const cartRoutes = require('./routes/cart')
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req,res){
    console.log("product req received!")
    res.send("<h1>Ecommmerce Site Backend<h1/>")
})

// Routes to specific file
app.use('/products', productRoutes)
app.use("/categories", categoriesRoute);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);


app.listen(5001, ()=>{
    console.log("Listening on port: 5001");
})

console.log("App js")

