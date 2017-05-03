'use strict';

const express = require('express');
const router = express.Router();
const domainsController = require('../controllers/domains');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/domains', requireAuth, domainsController.getDomains);

router.delete('/domains/:domainId', requireAuth, domainsController.deleteDomain);
// router.get('/domains/:domainId', requireAuth, domainsController.getDomain); //asta nu exista
module.exports = router;