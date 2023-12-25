const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');

function setServer(){
    const app = express();
    app.use(bodyParser.json())
    app.use("/api", routes)

    return app;
}

module.exports  = setServer;