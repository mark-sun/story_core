const User = require('../models/user'); // get our mongoose model

module.exports.create = function (req, res) {
    
    //var username = "Nick Cerminara";
    //var password = "password";
    console.log(username + '\t' + password);

    User.findOne({ name: username },
        function (err, user) {
            if (err) {
                console.log(err);
                return;
            }
            var result = new Object();
            if (!user) {
                result.success = false;
                result.message = 'Authentication failed. User not found.';
                //result = { success: false, message: 'Authentication failed. User not found.' };
            } else if (user) {
                console.log(user);
                // check if password matches
                if (user.password != password) {
                    result.success = false;
                    result.message = 'Authentication failed. Wrong password.';
                    //result = { success: false, message: 'Authentication failed. Wrong password.' };
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, secret, {
                        expiresIn: expire// expires in 24 hours
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
