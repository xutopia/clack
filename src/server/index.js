// /* eslint-disable no-console */
import Koa from 'koa';
import IO from 'koa-socket';
import send from 'koa-send';
import path from 'path';

const app = Koa();
const io = new IO();

app.use(function *() {
  yield send(this, this.path, { root: path.join(__dirname, '../../dist/index.html') });
})
io.attach(app);

io.on('connection', ctx => {
  console.log('[server] new connection to socket-server');
});

let usernames = [];
io.on('disconnect', ctx => {
  const { username } = ctx.socket;
  if (username) {
    console.log(`[server] disconnected: ${username}`);
    usernames = usernames.filter(u => u !== username)
  }
});

io.on('login', (ctx, { username }) => {
  console.log(`[server] login: ${username}`);
  usernames.push(username);
  console.log('this is usernames array: ', usernames);
  ctx.socket.username = username;

  io.broadcast('users.login', { username, usernames });
});

io.on('logout', ctx => {
  const { username } = ctx.socket;
  if (username) {
    console.log(`[server] logout: ${username}`);
    usernames = usernames.filter(u => u !== username)
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username, usernames });
  }
});

let messages = [];
io.on('message', (ctx, { text }) => {
  console.log(`[server] message: ${text}`);
  const message = {
    id: messages.length,
    text,
    username: ctx.socket.username,
  };
  messages.push(message);

  io.broadcast('messages.new', { message });
});

app.listen(3000, () => {
  console.log('[server] ready and listening on port 3000');
});

// /* eslint-disable no-console */
// import express from 'express';
// import webpack from 'webpack';
// import bodyParser from 'body-parser';
// import path from 'path';
// import config from '../../webpack.config.js';

// import socket from 'socket.io';

// const PORT = 8080;
// const app = express();
// const compiler = webpack(config);

// let room;

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(
//   require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.staticsPath,
//   }),
// );

// app.use(require('webpack-hot-middleware')(compiler, {
//   noInfo: true,
//   staticsPath: config.output.staticsPath
// }));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../static/index.html'));
// });

// const server = app.listen(PORT, '127.0.0.1', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`http://localhost:${PORT}`);
//   }
// });

// const io = socket(server)

// app.post('/', (req, res) => {
//   console.log('hitting / post route in server');
//   console.log('req.body', req.body);
//   const { Body, From } = req.body
//   const message = {
//     body: Body,
//     from
//   }
//   io.emit('message', message)
// })

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('subscribe', data => {
//     room = data.room;
//     socket.join(room);
//     console.log('joined room', room);
//   });
//   socket.on('unsubscribe', () => {
//     socket.leave(room);
//     console.log('leaving room', room);
//   });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('sending message to', msg.from);
//     console.log('this message', msg);
//     io.to(msg.room).emit('chat message', JSON.stringify(msg));
//   });
// });
