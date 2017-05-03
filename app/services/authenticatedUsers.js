'use strict';

const _ = require('lodash');
const PublicUser = require('../models/publicUser');

class AuthenticatedUsers {
	constructor() {
		this.authenticatedUsers = new Array();
	};

	logUserIn(user) {
		this.authenticatedUsers.push(user);
	};

	userAlreadySaved(userId) {
		const alreadyInList = _.find(this.authenticatedUsers, { id: userId });
		return alreadyInList ? true : false;
	};

	userLoggedOut(socketId) {
		_.remove(this.authenticatedUsers, { socket_id: socketId });
	};

	getUserBySocketId(socketId) {
		return _.find(this.authenticatedUsers, { socket_id: socketId });
	};

	getUserById(userId) {
		return _.find(this.authenticatedUsers, { id: userId });
	};

	getAuthenticatedUsers(userToIgnoreId) {
		let authenticatedUsersClone = _.clone(this.authenticatedUsers);
		_.remove(authenticatedUsersClone, { id: userToIgnoreId });

		return _.map(authenticatedUsersClone, (user) => {
			return new PublicUser(user.name, user.profileImageUrl, user.id);
		});
	};
};

module.exports = AuthenticatedUsers;