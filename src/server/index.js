/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../../webpack.config.js';

import socket from 'socket.io';

const PORT = 8080;
const app = express();
const compiler = webpack(config);

let room;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.staticsPath,
  }),
);

app.use(require('webpack-hot-middleware')(compiler, {
  noInfo: true,
  staticsPath: config.output.staticsPath
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../static/index.html'));
});

const server = app.listen(PORT, '127.0.0.1', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${PORT}`);
  }
});

const io = socket(server)

app.post('/', (req, res) => {
  console.log('hitting / post route in server');
  console.log('req.body', req.body);
  const { Body, From } = req.body
  const message = {
    body: Body,
    from
  }
  io.emit('message', message)
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('subscribe', data => {
    room = data.room;
    socket.join(room);
    console.log('joined room', room);
  });
  socket.on('unsubscribe', () => {
    socket.leave(room);
    console.log('leaving room', room);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('sending message to', msg.from);
    console.log('this message', msg);
    io.to(msg.room).emit('chat message', JSON.stringify(msg));
  });
});

