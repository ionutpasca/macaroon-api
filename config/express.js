'use strict';

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

function init(app) {
    const config = app.get('config');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.disable('x-powered-by');

    if (config.cors) {
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
};

module.exports.init = init;