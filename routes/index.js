const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

const AuthController = require('../auth/AuthController')
const UserController = require('../models/UserController')
const {verifyToken} = require('../auth/jstTokenGenerator');

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(cookie());

router.get('/app', verifyToken, UserController.app);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router