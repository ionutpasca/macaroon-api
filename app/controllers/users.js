'use strict';

const quark = require('quark')();
const queryExecuter = require('../common/queryExecuter');

function getUsers(req, res, next) {
    var args = {
        entity: 'users',
        action: 'get_all'
    };
    queryExecuter.executeQuark(args, res, next);
};

function getUser(req, res, next) {
    const userId = req.params.userId;
    var args = {
        entity: 'users',
        action: 'get_one',
        id: userId
    };
    queryExecuter.executeQuark(args, res, next);
};

function createUser(req, res, next) {
    res.json('dsadsa');
};

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;