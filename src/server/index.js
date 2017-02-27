/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
import Koa from 'koa';
import IO from 'koa-socket';
import send from 'koa-send';
import path from 'path';
import chalk from 'chalk'
import moment from 'moment'

const app = Koa();
const io = new IO();

const g = chalk.green.bind(chalk);
const b = chalk.blue.bind(chalk);
const gr = chalk.grey.bind(chalk);
const r = chalk.red.bind(chalk);
const y = chalk.yellow.bind(chalk);

const port = process.env.PORT || 3000

const d = () => y(`[${moment().format('HH:mm:ss')}]`)

app.use(function* () {
  yield send(this, this.path,
    { root: path.join(__dirname, '../../dist/index.html') });
})
io.attach(app);

io.on('connection', ctx => {
  const ip = ctx.socket.handshake.headers['x-forwarded-for'] || ctx.socket.handshake.address.address;
  console.log(d() + b(' Connection: ') + r('New user connected'), gr(ctx.socket.id), gr(ip));
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
  ctx.socket.usernames = usernames;

  io.broadcast('users.login', { username, usernames });
  console.log('users.login', username, usernames);
});

io.on('logout', ctx => {
  const { username } = ctx.socket;
  if (username) {
    console.log(`[server] logout: ${username}`);
    usernames = usernames.filter(u => u !== username)
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username });
  }
});

io.on('typing', (ctx, isTyping, third) => {
  console.log(`inside server, typing: ${third}`);
  const typingStatus = isTyping;
  console.log('hopefully once:', typingStatus);
  io.broadcast('users.typing', typingStatus);
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

const env = process.env.NODE_ENV || 'dev'

app.listen(port, () => {
  console.log(`Server started on port ${r(port)}, environement: ${b(env)}`);
});
