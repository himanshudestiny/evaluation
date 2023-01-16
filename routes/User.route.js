const express = require("express");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hashed_password) => {
            if(err) {
                console.log(err);
            } else {
                const user = new UserModel({ name, email, gender, password: hashed_password });
                await user.save();
                res.send("User registered successfully");
            }
        });
      
    } 
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email: email });
        if(user.length>0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key);
                    res.send({"message":"Login successful", "token": token});
                } else {
                    res.send("Wrong credentials");
                }
            });
        } else {
            res.send("Wrong credentials");
        }
        
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})



module.exports = {
    userRouter
}