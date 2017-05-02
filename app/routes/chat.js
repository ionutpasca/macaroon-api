'use strict';

const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/chat_rooms/:userId', requireAuth, ChatController.getChatRoomsForUser);
router.get('/chat_rooms/:firstUserId/:secondUserId', requireAuth, ChatController.getCreateChatRoom);

router.post('/chat_rooms/:roomId', requireAuth, ChatController.saveMessage);
module.exports = router;