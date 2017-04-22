const express = require('express');
const http = require('http');
const config = require('./config/main');
const ENV = process.env.NODE_ENV || 'development';

let server = null;
const quark = require('quark')();

const passportService = require('./app/middlewares/passport');

let app = express();
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

require('./config/express').init(app);

app.use('/', require('./app/routes/main'));
app.use('/api', require('./app/routes/auth'));
app.use('/api', require('./app/routes/users'));
app.use('/api', require('./app/routes/roles'));

app.use((err, req, res, next) => {
    res.status(500).json(err);
});

if (!module.parent) {
    server = http.createServer(app);
    server.listen(config.port || 3000);
    console.log(`${config.app.name} is running, listening on port ${config.port}, environment: ${ENV.toLowerCase()}`);
};