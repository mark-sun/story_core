var Authentication = require('../controllers/authController');
// API Server Endpoints
module.exports = function (app) {
    app.post('/auth', Authentication.create)
}