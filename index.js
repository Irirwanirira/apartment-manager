const setServer = require('./server');
const database = require("mongoose");
require('dotenv').config();
const port  = process.env.PORT;


database.connect("mongodb://localhost:27017/apartment")
    .then(()=> {
        const app = setServer()
        app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`)
            console.log("MongoDb connected");
        })
    })
    .catch((err)=> {
        console.log(err)
})