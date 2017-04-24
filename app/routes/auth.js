'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('../middlewares/authentication');
const requireLogin = passport.authenticate('local', { session: false });
const requireFacebookToken = passport.authenticate('facebook-token', { session: false });

router.get('/login/facebook', requireFacebookToken, AuthController.login);

router.post('/login', requireLogin, AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;