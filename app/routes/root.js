function post(req, res, db) {
    // You'll create your note here.
    console.log(req.body);
    res.send('Hello');
}

module.exports = function(app, db) {
  require('./authRoutes')(app);
  //require('authentication')(app);
  //userRoutes(app, db);
  // Other route groups could go here, in the future
};


// API ROUTES -------------------

// get an instance of the router for api routes
//var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
