const express = require('express');
//const MongoClient    = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db');
const User = require('./app/models/user'); // get our mongoose model
const app = express();
var router = express.Router();

//const config = require('./config'); // get our config file



const port = process.env.PORT || 3000;


//app.set('superSecret', secret); // secret variable
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
             
require('./app/routes/root')(app, db);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);