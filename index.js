const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const port  = process.env.PORT;
const createServer = require("./server");


mongoose.connect("mongodb://localhost:27017/apartment")
    .then(()=> {
        const app = createServer();
        app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`)
            console.log("MongoDb connected");
        })
    })
