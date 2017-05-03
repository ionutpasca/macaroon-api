'use strict';

const quark = require('quark')();
const queryExecuter = require('../common/queryExecuter');

function getDomains(req, res, next) {
    var args = {
        entity: 'domains',
        action: 'get_all'
    };
    queryExecuter.executeQuark(args, res, next);
};

function deleteDomain(req, res, next) {
    const domainId = req.params.domainId;
    const args = {
        entity: 'domains',
        action: 'delete',
        id: domainId
    };
    queryExecuter.executeQuark(args, res, next);
};
module.exports.getDomains = getDomains;
module.exports.deleteDomain = deleteDomain;