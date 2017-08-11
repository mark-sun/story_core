const express = require('express');

const router = express.Router();

const Authentication = require('../controllers/authController');
const Verification = require('../controllers/authVerifController');

router.post('/', Authentication.create);

router.get('/', Verification.verify);

// API Server Endpoints
module.exports = router;

