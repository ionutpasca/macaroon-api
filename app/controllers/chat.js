'use strict';

const quark = require('quark')();
const queryExecuter = require('../common/queryExecuter');

function getCreateChatRoom(req, res, next) {
	const args = {
		entity: 'chat',
		action: 'get_create_chat_room',
		first_user_id: req.params.firstUserId,
		second_user_id: req.params.secondUserId,
		initializer_id: req.user ? req.user.id : null
	};
	queryExecuter.executeQuark(args, res, next);
};

function getChatRoomsForUser(req, res, next) {
	const userId = req.params.userId;
	const args = {
		entity: 'chat',
		action: 'get_chat_rooms_for_user',
		user_id: userId
	};
	queryExecuter.executeQuark(args, res, next);
};

function saveMessage(req, res, next) {
	const sender = req.user ? req.user.id : null;
	const chatRoomId = req.params.roomId;
	const args = {
		entity: 'chat',
		action: 'save_message',
		senderId: sender,
		chatRoomId: chatRoomId,
		messageInfo: {
			message: req.body.message,
			date: req.body.date
		}
	};
	queryExecuter.executeQuark(args, res, next);
};

module.exports.getCreateChatRoom = getCreateChatRoom;
module.exports.getChatRoomsForUser = getChatRoomsForUser;
module.exports.saveMessage = saveMessage;