require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var cors = require('cors')

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use(express.json());
app.use(express.static(path.join(__dirname, '/assets')));
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/api', require('./api'));

let PORT = (process.env.PORT || '4000');
app.listen(PORT, async function () {
    console.log('Server started port : ', this.address().port);
});

module.exports = app;