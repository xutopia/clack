let usernames = [];
let messages = [];

const socketConnection = ctx => {
  const ip = ctx.socket.handshake.headers['x-forwarded-for'] ||
    ctx.socket.handshake.address.address;
  log(
    d() + b(' Connection: ') + r('New user connected'),
    gr(ctx.socket.id),
    gr(ip),
  );
};

const socketDisconnect = ctx => {
  const { username } = ctx.socket;
  if (username) {
    log(`[server] disconnected: ${username}`);
    usernames = usernames.filter(u => u !== username);
  }
};

const socketLogin = (ctx, { username, usernames }) => {
  log(`${[d()]} [server] received ${g('login')} event for: ${username}`);
  usernames.push(username);
  log('this is usernames array: ', usernames);
  ctx.socket.username = username;
  ctx.socket.usernames = usernames;

  io.broadcast('users.login', { username, usernames });
  log('users.login', username, usernames);
};

const socketLogout = ctx => {
  const { username } = ctx.socket;
  if (username) {
    log(`[server] logout: ${username}`);
    usernames = usernames.filter(u => u !== username);
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username });
  }
};

const broadcastMessage = (ctx, { text }) => {
  log(`[server] message: ${text}`);
  const message = {
    id: messages.length,
    text,
    username: ctx.socket.username,
  };
  messages.push(message);

  io.broadcast('messages.new', { message });
};

export {
  socketConnection,
  socketDisconnect,
  socketLogin,
  socketLogout,
  broadcastMessage
};
