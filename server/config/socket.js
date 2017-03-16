import IO from 'koa-socket';
import dateformat from 'dateformat';
import generateRandomAvatar from '../util/generateRandomAvatar';

import { log, d, g, b, gr, r, y, yb, yellowRed, blackWhite } from '../util/logging';

let usernames = [];
let userAvatar = {};
const messages = [];
const privateMessages = [];
const usersId = {};

const io = new IO();

const socketConnection = ctx => {
  const ip = ctx.socket.handshake.headers['x-forwarded-for'] ||
    ctx.socket.handshake.address.address;
  log(
    d() + b(' Connection: ') + yellowRed('New user connected'),
    blackWhite(ctx.socket.id),
    blackWhite(ip),
  );
  ctx.socket.join('room1');
};

const socketDisconnect = ctx => {
  const { username } = ctx.socket;
  if (username) {
    log(`${[d()]} [server] disconnected: ${username}`);
    usernames = usernames.filter(u => u !== username);
    delete userAvatar[username];
    io.broadcast('users.disconnect', { username, usernames });
  }
};

const socketLogin = (ctx, { username }) => {
  log(`${[d()]} [server] received ${g('login')} event for: ${username}`);
  usernames.push(username);
  ctx.socket.username = username;
  ctx.socket.usernames = usernames;

  if(usersId[username] === undefined) {
    usersId[username] = ctx.socket.id;
    userAvatar[username] = generateRandomAvatar();
    const avatar = userAvatar[username];
    // io.broadcast('users.join', { usernames });
    io.broadcast('users.login', { username, usernames, avatar });
  } else {
    const errorText = `a spy is trying to infiltrate the chat under the name: ${username}`;
    const now = new Date();
    const timeStamp = dateformat(now, 'shortTime');
    const message = {
      id: messages.length,
      errorText,
      username: 'invalid',
      timeStamp,
      reactions: { likes: 0 },
      target: 'all'
    };
    io.broadcast('duplicate', { message });
  }
};

const socketLogout = ctx => {
  const { username } = ctx.socket;
  if (username) {
    log(`${[d()]} [server] logout: ${username}`);
    usernames = usernames.filter(u => u !== username);
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username, usernames });
  }
};

const broadcastMessage = (ctx, { text, target }) => {
  log(`${[d()]} [server] broadcasting message: ${text}`);
  const now = new Date();
  const timeStamp = dateformat(now, 'shortTime');
  const message = {
    id: messages.length,
    text,
    username: ctx.socket.username,
    timeStamp,
    reactions: { likes: 0 },
    target,
    avatar: userAvatar[ctx.socket.username],
  };
  messages.push(message);
  log(`${[d()]} [server] Received new message from client, ${g('broadcasting')} message to ${target}`);
  io.broadcast('messages.new', { message });
  // io.sockets.in('room-1').emit('messages.new', { message });
};

const broadcastPrivateMessage = (ctx, { target, text }) => {
  log(`${[d()]} [server] broadcasting private message: ${text}`);
  const timeStamp = new Date();
  const privateMessage = {
    id: privateMessages.length,
    text,
    username: ctx.socket.username,
    timeStamp,
    reactions: { likes: 0 },
    target,
  };
  privateMessages.push(privateMessages);

  log(`${[d()]} [server] Received new private message from client, ${g('broadcasting')} message to ${target}`);
  log(`ctx.socket ${ctx}`);
  // ctx.socket.broadcast().emit('messages.private', { privateMessage });
  // io.to(/* ctx.id */).emit('messages.private', { privateMessage });
  // io.broadcast.to(/* ctx.id */).emit('messages.private', { privateMessage });
  // io.sockets.in(usersId[target]).emit('messages.private', { privateMessage });
};

const usersTypingStatus = (ctx, { typingStatus, user, userStatus }) => {
  // log(`${[d()]} [server] Received new user typing status from client, ${g('broadcasting')} status to all users`);
  const avatar = userAvatar[user];
  io.broadcast('userTyping', { typingStatus, user, userStatus, avatar });
};

const broadcastUpdatedMessage = (ctx, { likedMessage }) => {
  likedMessage.reactions.likes ++;
  log(`${[d()]} [server] Received new message reaction from client, ${g('broadcasting')} updated reactionCount to all users`);
  io.broadcast('messages.update', { likedMessage });
};

export {
  io,
  socketConnection,
  socketDisconnect,
  socketLogin,
  socketLogout,
  broadcastMessage,
  broadcastPrivateMessage,
  usersTypingStatus,
  broadcastUpdatedMessage
};
