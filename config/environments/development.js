module.exports = {
    port: 8080,
    host: '127.0.0.1',
    authUsersSocketPort: 8083,
    secret: 'MacAr00nS3cr3t!.{[}]...',
    app: {
        name: 'Macaroon API'
    },
    store: {
        port: 8081,
        host: '127.0.0.1'
    },
    facebookAuth: {
        clientID: '1835099360148534',
        clientSecret: 'f730511ec74ac9dc79a4122ef0cc95a7',
        callbackURL: 'http://localhost:8080/api/facebook/callback'
    }
};