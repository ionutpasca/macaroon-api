'use strict';

const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles');

router.get('/roles', rolesController.getRoles);

module.exports = router;