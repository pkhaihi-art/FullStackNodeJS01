const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin, handleForgotPassword } = require('../controllers/userController');
const { getApiHome } = require('../controllers/homeController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

router.use(delay);

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/forgot-password', handleForgotPassword);
router.get('/home', auth, getApiHome);

module.exports = router;