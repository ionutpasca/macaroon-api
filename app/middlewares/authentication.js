'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/main');

const DataExtractor = require('../common/dataExtractor');

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 1440
	});
};

function setUserInfo(req) {
	return {
		id: req.id,
		email: req.email,
		roles: req.roles
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
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	if (!email || !password || !name) {
		return res.status(422);
	};

	try {
		const userAlreadyExists = await DataExtractor.userExists(email);
		if (userAlreadyExists) {
			return res.status(422).send({ error: 'Email already in use' });
		}
		const user = {
			email: email,
			password: password,
			name: name
		};
		const insertUserResponse = await DataExtractor.insertUser(user);
		const userInfo = setUserInfo(insertUserResponse);
		res.status(201).json({
			token: 'JWT ' + generateToken(userInfo),
			userInfo: userInfo
		});

	} catch (error) {
		next(error);
	}
};

function authenticateRoles(roles) {
	return async function (req, res, next) {
		const user = req.user;
		try {
			const foundUser = DataExtractor.getOneUser(user.id);
		} catch (error) {
			res.status(404).json({ error: 'User not found' });
			return next('Unauthorized');
		}
	};
};

module.exports.login = login;
module.exports.register = register;
module.exports.authenticateRoles = authenticateRoles;