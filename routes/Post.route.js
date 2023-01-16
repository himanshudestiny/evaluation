const express = require("express");
const { PostModel } = require("../models/Post.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/User.model");
require('dotenv').config();


const postRouter = express.Router();

postRouter.use(express.json());



postRouter.get("/", async (req, res) => {
    const query = req.query;
    try {
      const posts = await PostModel.find({ query });
      res.send(posts);
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})

postRouter.post("/add", async (req, res) => {
    const payload = req.body;
    try {
      const post = new PostModel(payload);
      await post.save();
      res.send("Post added successfully");
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const ID = req.params.id;
    const user = await UserModel.findOne({ _id: ID });
    const userInDatabase = user.userID;
    const userRequesting = req.body.userID;
    
    try {
        if(userInDatabase!==userRequesting) {
            res.send("Login first");
        } else {
            const updated_post = await PostModel.findByIdAndUpdate({_id: ID}, payload)
            res.send("Post updated successfully");
        }
      
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    const user = await UserModel.findOne({ _id: ID });
    const userInDatabase = user.userID;
    const userRequesting = req.body.userID;
    
    try {
        if(userInDatabase!==userRequesting) {
            res.send("Login first");
        } else {
            const deleted_post = await PostModel.findByIdAndDelete({_id: ID})
            res.send("Post deleted successfully");
        }
      
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
})


module.exports = {
    postRouter
}