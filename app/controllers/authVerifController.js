const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const secret = require('../../config/secret').secret;

function verify(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log('junyan is here');
    console.log(token);

    // decode token
    if (token) {
        console.log('detect token');

        // verifies secret and checks exp
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded.id;
                console.log('update as : ', req.user);
                console.log(typeof next);
                next();
                // res.json({ success: true, message: 'Passed to authenticate token.' });
            }
        });
    } else {
        // if there is no token
        // return an error
        res.status(403).json({
            success: false,
            message: 'No token provided.',
        });
    }
}

module.exports = {
    verify,
};
