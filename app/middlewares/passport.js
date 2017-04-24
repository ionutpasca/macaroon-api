'use strict';

const passport = require('passport');
const config = require('../../config/main');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const DataExtractor = require('../common/dataExtractor');
const Auth = require('./authentication');

const FacebookTokenStrategy = require('passport-facebook-token');

const localOptions = {
	usernameFields: 'email'
};

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
	try {
		const user = await DataExtractor.getUserForAuth(email, password);
		if (user.email) {
			Object.assign(user, { authMethod: 'local' });
			done(null, user);
		} else {
			done(null, false, { error: 'Login failed' });
		}
	} catch (error) {
		if (error.status && error.status === 401) {
			return done(null, false, error);
		}
		return done(error);
	};
});

const facebookTokenStrategy = new FacebookTokenStrategy({
	clientID: config.facebookAuth.clientID,
	clientSecret: config.facebookAuth.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
	try {
		let user = await DataExtractor.getOneUser({ 'facebook_id': profile.id });
		if (user) {
			return done(null, user);
		} else {
			const newUser = generateUserFromFbProfile(profile);
			user = await DataExtractor.insertUser(newUser);
			if (user) {
				Object.assign(user, { authMethod: 'fb' });
				done(null, user);
			} else {
				done(null, false);
			}
		}
	} catch (error) {
		done(error);
	};
});

function generateUserFromFbProfile(profile) {
	return {
		email: profile.emails[0].value,
		name: profile.displayName,
		facebook_id: profile.id,
		profile_image_url: profile.photos[0].value
	};
};

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await DataExtractor.getOneUser({ 'id': payload.id });
		if (user) {
			return done(null, user);
		}
		done(null, false);
	} catch (error) {
		done(error);
	}
});

passport.use(localStrategy);
passport.use(facebookTokenStrategy);
passport.use(jwtLogin);