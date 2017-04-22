'use strict';

const passport = require('passport');
const config = require('../../config/main');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const queryExecuter = require('../common/queryExecuter');
const DataExtractor = require('../common/dataExtractor');

const localOptions = {
	usernameFields: 'email'
};

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
	try {
		const user = await DataExtractor.getUserForAuth(email, password);
		if (user.email) {
			return done(null, user);
		} else {
			return done(null, false, { error: 'Login failed' });
		}
	} catch (error) {
		if(error.status && error.status === 401) {
			return done(null, false, error);
		}
		return done(error);
	};
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await DataExtractor.getOneUser(payload.id);
		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		done(error);
	}
});

passport.use(jwtLogin);
passport.use(localStrategy);