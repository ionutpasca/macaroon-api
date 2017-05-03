'use strict';

const quark = require('quark')();
const config = require('../../config/main');

quark.client({ port: config.store.port, hostname: config.store.host }, { entity: 'users' });
quark.client({ port: config.store.port, hostname: config.store.host }, { entity: 'chat' });
quark.client({ port: config.store.port, hostname: config.store.host }, { entity: 'domains' });

function executeQuark(args, res, next) {
    quark.exec(args, (err, result) => {
        if (err) {
            next(err);
        }
        res.json(result);
    });
};

function executeQuarkAsPromise(args) {
    return new Promise((resolve, reject) => {
        quark.exec(args, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
};

module.exports.executeQuark = executeQuark;
module.exports.executeQuarkAsPromise = executeQuarkAsPromise