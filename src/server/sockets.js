import express from 'express';
// require socket.io
import socket from 'socket.io';
// require controller files
const user = require('./user/userController');
const message = require('./message/messageController');
const reaction = require('./reaction/reactionController');


const router = new express.Router();

socket.on('name', user.createUser(data));
// createUser function needs to run when we send currentUser from the front-end

socket.on('message', message.createMessage(messageObject));
// createMessage function will run when a new message is created on the front-end

socket.on('reaction', reaction.addReactions(messageObject));
// addReactions will run whenever a reaction is added to the database


// fetchMessages will fetch all messages in the database for the users that are in the channel
