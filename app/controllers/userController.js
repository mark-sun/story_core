const User = require('../models/user'); // get our mongoose model
const Encrypt = require('./encryptionController');

function getUser(req, initial = false) {
    let username = '';
    let password = '';
    let nickname = '';
    let datebirth;
    try {
        if (initial) {
            username = req.body.username;
            password = Encrypt.encryptPassword(req.body.password);
        }
        nickname = req.body.nickname;
        if (req.body.datebirth) {
            datebirth = new Date(req.body.datebirth);
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    console.log(username, password);
    const user = {
        nickname,
        datebirth,
        admin: false,
    };

    if (initial) {
        user.username = username;
        user.password = password;
    }

    return user;
}

function getResponse(err, obj) {
    let result;
    if (err) {
        console.log(err);
        result = {
            success: false,
            message: 'Error in DB',
        };
    } else if (!obj) {
        result = {
            success: false,
            message: 'NO match find in DB',
        };
    } else {
        console.log('User loaded successfully');
        const sub = {
            id: obj.id,
            name: obj.nickname,
            datebirth: obj.datebirth,
        };

        result = {
            success: true,
            message: 'success',
            sub,
        };
    }
    return result;
}

function create(req, res) {
    // create a user based on 
    const user = getUser(req, true);

    if (user === null) {
        res.json({
            success: false,
            message: 'Not valid input',
        });
    }
    // save the sample user
    User.create(user, (err) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Can not store in DB',
            });
        } else {
            console.log('User saved successfully');
            res.json({
                success: true,
                username: user.username,
                message: 'success',
            });
        }
    });
}

function read(req, res) {
    const id = req.params.id;

    console.log('get param name as ', id);
    console.log(typeof id);

    User.findById(id, (err, obj) => {
        const result = getResponse(err, obj);
        console.log(result);
        res.json(result);
    });
}

function update(req, res) {
    const id = req.params.id;
    if (id !== req.user) {
        res.status(403).json({
            success: false,
            message: 'Not the same user',
        });
        return;
    }
    console.log('get param name as ', id);
    console.log(typeof id);

    const user = getUser(req);

    if (user === null) {
        res.json({
            success: false,
            message: 'Not valid input',
        });
    }

    User.findByIdAndUpdate(id, user, {}, (err, obj) => {
        const result = getResponse(err, obj);
        res.json(result);
    });
}

module.exports = {
    create,
    read,
    update,
};
