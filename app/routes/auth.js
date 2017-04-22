'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('../middlewares/authentication');
const requireLogin = passport.authenticate('local', { session: false });

router.post('/register', AuthController.register);
router.post('/login', requireLogin, AuthController.login);

module.exports = router;