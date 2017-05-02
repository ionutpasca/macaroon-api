'use strict';

const config = require('../../config/main');
const logger = require('../../config/winston');
const AuthUsersService = require('../services/authenticatedUsers');
const PublicUser = require('../models/publicUser');

class AuthenticatedUsersSocket {
	constructor() {
		this.authSocket = require('socket.io').listen(config.authUsersSocketPort);
		this.authService = new AuthUsersService();
		this.initializeSocket();
	};

	initializeSocket() {
		this.authSocket.on('connection', socket => {
			socket.on('user_data', (user) => {
				const userAlreadySaved = this.authService.userAlreadySaved(user.id);
				if (userAlreadySaved) {
					return;
				}
				const publicUserData = new PublicUser(user.name, user.profileImageUrl, user.id);
				this.broadcastNewConnectedUser(socket, publicUserData);

				Object.assign(user, { socket_id: socket.id });
				this.authService.logUserIn(user);
			});

			socket.on('get_logged_users', (user) => {
				const loggedUsers = this.authService.getAuthenticatedUsers(user.id);
				socket.emit('logged_users', loggedUsers);
			});

			socket.on('disconnect', () => {
				this.disconnectUser(socket);
			});

			socket.on('forceDisconnect', () => {
				this.disconnectUser(socket);
			});

			socket.on('new_message', (messageData) => {
				this.emitChatMessageToUser(socket, messageData);
			});
		});
	};

	broadcastNewConnectedUser(socket, user) {
		socket.broadcast.emit('user:new', user);
	};

	disconnectUser(socket) {
		const user = this.authService.getUserBySocketId(socket.id);
		if (!user) {
			return;
		}
		const publicUserData = new PublicUser(user.name, user.profileImageUrl, user.id);
		socket.broadcast.emit('user:disconnected', publicUserData);
		this.authService.userLoggedOut(socket.id);
	};

	emitChatMessageToUser(socket, messageData) {
		const user = this.authService.getUserById(messageData.toUserId);
		if (!user) {
			return;
		}
		const message = {
			sender: user.id,
			message: messageData.message,
			date: messageData.date
		};
		socket.broadcast.to(user.socket_id).emit('new_message_received', message);
	};
};

module.exports = AuthenticatedUsersSocket;