const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');



router.post('/signup', UserController.register);
router.post('/login', UserController.login);

module.exports = router;