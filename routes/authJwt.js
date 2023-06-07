require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ------------ implement jwt in separate file + refresh tokens!!!!!!!!!!!!------------->>>>>>>>>>>

router.post('/', authorizeToken, (req, res) => {

    if(req.verified){
        const obj = req.obj;
        res.status(200).send(obj)
    }
    else {
        const user = {name: "Cheema"};
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN,{expiresIn: "35s"});
        res.json({accessToken: accessToken});
    }
})

function authorizeToken(req, res, next){
    const authHeader = req.headers['authorization'];

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err){
                res.status(401).send(err)
            }
            else{
                req.obj = user;
                req.verified = true;
            }
        })
    }else{

        console.log("authorization Header not defined");
    }
    next();
}


module.exports = router;

