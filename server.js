const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');

function createServer(){
    const app = express();
    app.use(bodyParser.json())
    app.use("/api", routes)

    return app;
}

module.exports  = createServer;