require('dotenv').config();
const express = require("express");
const cors = require("cors");
const categoriesRoute = require("./routes/categories")
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req,res){
    console.log("product req received!")
    res.send("<h1>Ecommmerce Site Backend<h1/>")
})

app.post('/login',authorizeToken, (req, res) => {
    const user = {name: "Aqib", id: 2};
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);
    res.json({accessToken});

})

function authorizeToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        console.log(user);
    });
    next();
}

// Routes to specific file
app.use('/products', productRoutes)
app.use("/categories", categoriesRoute);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);



app.listen(5001, ()=>{
    console.log("Listening on port: 5001");
})


