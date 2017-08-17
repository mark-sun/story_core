const bcrypt = require('bcrypt');

const numberOfRounds = 10;

function encryptPassword(password) {
    return bcrypt.hashSync(password, numberOfRounds);
}

function comparePassword(password, encryptedPassword) {
    console.log('encrypt from ', password, '\tto ', encryptedPassword);
    return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
    encryptPassword,
    comparePassword,
};
