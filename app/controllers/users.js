'use strict';

const quark = require('quark')();
const queryExecuter = require('../common/queryExecuter');

function getUsers(req, res, next) {
    const args = {
        entity: 'users',
        action: 'get_all'
    };
    queryExecuter.executeQuark(args, res, next);
};

function getUser(req, res, next) {
    const userId = req.params.userId;
    const args = {
        entity: 'users',
        action: 'get_one',
        id: userId
    };
    queryExecuter.executeQuark(args, res, next);
};

function deleteUser(req, res, next) {
    const userId = req.params.userId;
    const args = {
        entity: 'users',
        action: 'delete',
        id: userId
    };
    queryExecuter.executeQuark(args, res, next);
};

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;