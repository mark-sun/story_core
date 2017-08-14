const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/user'); // get our mongoose model
const secret = require('../../config/secret').secret;

const expire = 60 * 60 * 24;

function create(req, res) {
    // find the user
    // console.log(req);
    let username = '';
    let password = '';
    try {
        username = req.body.username;
        password = req.body.password;
    } catch (e) {
        console.log(e);
        return;
    }
    console.log(username, '\t', password);

    User.findOne({ username },
        (err, user) => {
            if (err) {
                console.log(err);
                return;
            }
            const result = {};
            if (!user) {
                result.success = false;
                result.message = 'Authentication failed. User not found.';
            } else if (user) {
                console.log(user);
                // check if password matches
                if (user.password !== password) {
                    result.success = false;
                    result.message = 'Authentication failed. Wrong password.';
                } else {
                    // if user is found and password is right
                    // create a token
                    const token = jwt.sign(user, secret, {
                        expiresIn: expire, // expires in 24 hours
                    });

                    // return the information including token as JSON
                    result.success = true;
                    result.message = 'Enjoy your token!';
                    result.token = token;
                }
            }
            console.log(result);
            res.json(result);
        });
}

module.exports = {
    create,
};
