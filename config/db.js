const mongoose = require('mongoose');
const url = require('./secret').url;

mongoose.connect(url); // connect to database
const db = mongoose.connection;

console.log('try to access the db');

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connection with database succeeded.');
});

module.exports.db = db;
