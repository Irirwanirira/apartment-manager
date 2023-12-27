const express = require("express");

const mongoose = require("mongoose");

require('dotenv').config();
const port  = process.env.PORT;
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const creteServer = require("./server");


mongoose.connect("mongodb://localhost:27017/apartment")
    .then(()=> {
        const app = express();
        app.use(bodyParser.json());
        app.use("/api", routes);
        app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`)
            console.log("MongoDb connected");
        })
    })
