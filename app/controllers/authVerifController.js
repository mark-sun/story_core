const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const secret = require('../../config/secret').secret;
const User = require('../models/user'); // get our mongoose model

module.exports.verify = function (req, res, next) {
    // find the user
    //console.log(req);

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}