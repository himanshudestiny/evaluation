const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.route");
const { postRouter } = require("./routes/Post.route");
const { authenticate } = require("./middlewares/Authenticate.middleware");
var cors = require('cors')
require('dotenv').config()



const app = express();
app.use(cors())
app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Server is running on port 8080")
    }
    catch (err) {
        console.log("Error occured while connecting to the server");
        console.log(err);
    }
    
})