const express = require('express');

const router = express.Router();

const User = require('../controllers/userController');
const Auth = require('../controllers/authVerifController');

router.post('/', User.create);
router.get('/:id', Auth.verify, User.read);
router.put('/:id', Auth.verify, User.update);

// API Server Endpoints
module.exports = router;
