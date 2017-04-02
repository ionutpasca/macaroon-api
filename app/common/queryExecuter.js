'use strict';

const quark = require('quark')();
const config = require('../../config/main');

quark.client({ port: 8081, hostname: '127.0.0.1' }, { entity: 'users' });

function executeQuark(args, res, next) {
    quark.exec(args, (err, result) => {
        if (err) {
            next(err);
        }
        res.json(result);
    });
};

module.exports.executeQuark = executeQuark;