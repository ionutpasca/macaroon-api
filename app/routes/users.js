'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/users', requireAuth, usersController.getUsers);
router.get('/users/:userId', requireAuth, usersController.getUser);

router.delete('/users/:userId', requireAuth, usersController.deleteUser);

module.exports = router;