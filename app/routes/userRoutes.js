var User = require('../controller/userController');
// API Server Endpoints
module.exports = function (app) {
    app.use(require('../controller/authController')(req, res, next)),
        app.post('/User', User.create),
        app.get('/User/:id', User.get),
        app.put('/User/:id', User.update)
    //app.delete('/company/:id', Company.delete)
}