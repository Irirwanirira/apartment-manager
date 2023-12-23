const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
var cors = require('cors')
const database = require("mongoose");
const port  = process.env.PORT;
const routes = require('./src/routes/routes');


database.connect("mongodb://localhost:27017/apartment")
    .then(()=> {
        const app = express();

        app.use(bodyParser.json())
        app.use(cors());
        app.use("/api", routes)
        app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`)
            console.log("MongoDb connected");
        })
    })


