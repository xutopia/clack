import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login, logout, addUser, removeUser, newMessage, sendMessage, isTyping as typing, typingStatus,
} from '../actions/actions';

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
    socket.on('users.typing', ({ status, user }) => {
      emit(typingStatus({ status, user }));
    })
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
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

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    socket.emit('message', payload);
  }
}

function* writing(socket) {
  while (true) {
    const { payload } = yield take(`${typing}`);
    socket.emit('typing', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(writing, socket);
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
    const socket = yield call(connect);
    socket.emit('login', { username: payload.username });

    const task = yield fork(handleIO, socket);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* rootSaga() {
  yield fork(loginFlow);
}
