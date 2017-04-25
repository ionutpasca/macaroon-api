'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/main');
const DataExtractor = require('../common/dataExtractor');

const passport = require('passport');

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 1440
	});
};

function setUserInfo(user) {
	return {
		id: user.facebook_id ? user.facebook_id : user.id,
		email: user.email,
		roles: user.roles,
		authMethod: user.authMethod ? user.authMethod : 'local',
		profileImageUrl: user.profile_image_url ? user.profile_image_url : null,
		name: user.name
	};
};

function login(req, res, next) {
	const userInfo = setUserInfo(req.user);

	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo),
		userInfo: userInfo
	});
};

async function register(req, res, next) {
	const user = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name
	};

	try {
		const insertUserResponse = await registerNewUser(user);
		const userInfo = setUserInfo(insertUserResponse);
		
		res.status(201).json({
			token: 'JWT ' + generateToken(userInfo),
			userInfo: userInfo
		});

	} catch (error) {
		if (error.status && error.status === 422) {
			res.status(422);
		}
		next(error);
	}
};

async function registerNewUser(user) {
	if (!user.email || !user.name || (!user.facebook_id && !user.password)) {
		let error = new Error();
		error.status(422);
		throw error;
	};
	try {
		const userAlreadyExists = await DataExtractor.userExists(user.email);
		if (userAlreadyExists) {
			return res.status(422).send({ error: 'Email already in use' });
		}
		
		const insertUserResponse = await DataExtractor.insertUser(user);
		return insertUserResponse;
	} catch (error) {
		throw error;
	};
};

function authenticateRoles(roles) {
	return async function (req, res, next) {
		const user = req.user;
		try {
			const foundUser = DataExtractor.getOneUser({ 'id': user.id });
		} catch (error) {
			res.status(404).json({ error: 'User not found' });
			return next('Unauthorized');
		}
	};
};

module.exports.login = login;
module.exports.register = register;
module.exports.registerNewUser = registerNewUser;
module.exports.authenticateRoles = authenticateRoles;