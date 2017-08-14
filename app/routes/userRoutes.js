const express = require('express');

const router = express.Router();

const User = require('../controllers/userController');

router.post('/', User.create);
router.get('/:id', User.read);
router.put('/:id', User.update);

// API Server Endpoints
module.exports = router;
