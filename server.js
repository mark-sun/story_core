const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db');

const app = express();
const router = express.Router();

app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// add route
require('./app/routes/root')(app, db);

// =======================
// start the server ======
// =======================
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens at http://localhost: ', port);
