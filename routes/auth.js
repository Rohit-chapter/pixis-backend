const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/registerUser', authController.registerUsers);

module.exports = router;