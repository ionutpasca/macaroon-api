module.exports = {
    port: 8080,
    host: '127.0.0.1',
	secret: '<SECRET KEY TO SIGN JWT>',
    app: {
        name: 'Macaroon API'
    },
    store: {
        port: 8081,
        host: '127.0.0.1'
    }
};