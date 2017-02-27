import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login, logout, addUser, removeUser, newMessage, sendMessage,
} from '../actions/actions';
// need to add 'addReaction'

function connect() {
  const socket = io('http://localhost:3000');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username, usernames }) => {
      emit(addUser({ username, usernames }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    // guessing I need a socket.on(messages.update)
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
// generator function update, handleIO

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

/*
  `loginFlow` saga watches for login and logout events.
  While a user is logged in, loginFlow manages IO process.
  When a user logs out, the logout action is fired and is picked up
  by our saga which then cancels the task.
*/

function* loginFlow() {
  while (true) {
    let { payload } = yield take(`${login}`);
    // takes info from login action on the landing component and assigns it to payload (that means at this point payload is a key whose value is the username)
    const socket = yield call(connect); // open up a socket to the server, connect is defined above
    socket.emit('login', { username: payload.username });
    // emit this information to the server

    const task = yield fork(handleIO, socket);
    // fork combines functions listed in parameters to run at the same time, or 'kick off the process'

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* rootSaga() {
  yield fork(loginFlow);
}
