'use strict';

const quark = require('quark')();
const queryExecuter = require('../common/queryExecuter');

function getRoles(req, res, next) {
    var args = {
        entity: 'roles',
        action: 'get_all'
    };
    queryExecuter.executeQuark(args, res, next);
};

module.exports.getRoles = getRoles;