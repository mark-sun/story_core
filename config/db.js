const mongoose = require('mongoose');
const url = require('./secret').url;

mongoose.createConnection(url); // connect to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('Connection with database succeeded.');
});

module.exports.db = db;
