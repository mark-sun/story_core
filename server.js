const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('./config/db');

const app = express();
const router = express.Router();
const auth = require('./app/routes/authRoutes');
const user = require('./app/routes/userRoutes');

app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// add route
app.use('/auth/', auth);
app.use('/user/', user);
// =======================
// start the server ======
// =======================
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens at http://localhost: ', port);
