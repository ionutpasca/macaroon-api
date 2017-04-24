'use strict';

const queryExecuter = require('./queryExecuter');

function getUserForAuth(email, password) {
	const args = {
		entity: 'users',
		action: 'get_one_by_email_and_pass',
		email: email,
		password: password
	};
	return queryExecuter.executeQuarkAsPromise(args);
};

function userExists(email) {
	const args = {
		entity: 'users',
		action: 'user_exists',
		email: email
	};
	return  queryExecuter.executeQuarkAsPromise(args);
};

function getOneUser(queryData) {
	const args = {
		entity: 'users',
		action: 'get_one',
		data: queryData
	};
	return  queryExecuter.executeQuarkAsPromise(args);

};

function insertUser(user) {
	const args = {
		entity: 'users',
		action: 'insert',
		user: user
	};
	return  queryExecuter.executeQuarkAsPromise(args);
};

module.exports.getUserForAuth = getUserForAuth;
module.exports.userExists = userExists;
module.exports.getOneUser = getOneUser;
module.exports.insertUser = insertUser;