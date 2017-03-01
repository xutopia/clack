/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
import Koa from 'koa';
import send from 'koa-send';
import logger from 'koa-logger';
import path from 'path';
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'

import { log, d, g, b, gr, r, y, yb, redWhite } from './util/logging';

import channel from './db/controllers/channel';
import message from './db/controllers/message';
import user from './db/controllers/user';

import db from './config/mongo'

import {
  io,
  socketConnection,
  socketDisconnect,
  socketLogin,
  socketLogout,
  broadcastMessage,
  usersTypingStatus,
  broadcastUpdatedMessage,
} from './config/socket';

const app = Koa();
const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.log(err);
});

// app.use(function* () {
//   yield db();
// })
app.use(logger());
app.use(bodyParser());
app.use(channel.routes());
app.use(message.routes());
app.use(user.routes());

// app.use(function* () {
//   yield cors();
// })
// app.use(function* () {
//   yield passport.initialize();
// })
app.use(function* () {
  yield send(this, this.path, {
    root: path.join(__dirname, '../../dist/index.html'),
  });
});

io.attach(app);

// Socket.io listeners
io.on('connection', socketConnection);
io.on('disconnect', socketDisconnect);
io.on('login', socketLogin);
io.on('logout', socketLogout);
io.on('message', broadcastMessage);
io.on('typing', usersTypingStatus);
io.on('likedMessage', broadcastUpdatedMessage);

app.listen(port, () => {
  log(`Server started on port ${yb(port)}, environment: ${b(env)}, mongodb status: ${b(mongoose.connection.readyState)}`);
});
