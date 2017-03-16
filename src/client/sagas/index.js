import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login,
  logout,
  addUser,
  removeUser,
  newMessage,
  sendMessage,
  isTyping as typing,
  currentlyTyping,
  sendPrivateMessage,
  newPrivateMessage,
  addReaction,
  sendUpdatedReaction,
  doubleNameError,
  addToUsernames,
  removeFromUsernames,
} from '../actions/actions';
// need to add 'addReaction'

import { loginFlow, logoutFlow, registerFlow } from './auth';

function connect() {
  const socketProd = io('http://35.163.227.116:8080');
  const socketDev = io('http://localhost:3000');
  let socket
  if (process.env.NODE_ENV === 'production') {
    socket = socketProd
  } else {
    socket = socketDev
  }
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  //eventChannel is listening for data coming back from the server, then calls an action that will interact with the reducers
  return eventChannel(emit => {
    socket.on('users.login', ({ username, usernames, avatar }) => {
      emit(addUser({ username, usernames, avatar }));
      emit(addToUsernames({ username, usernames }));
    });
    socket.on('users.logout', ({ username, usernames }) => {
      emit(removeUser({ username, usernames }));
    });
    socket.on('users.disconnect', ({ username, usernames }) => {
      emit(removeFromUsernames({ username, usernames }));
    });
    socket.on('userTyping', ({ typingStatus, user, userStatus, avatar }) => {
      emit(currentlyTyping({ typingStatus, user, userStatus, avatar }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('messages.update', ({ likedMessage }) => {
      emit(sendUpdatedReaction({ likedMessage }));
    });
    socket.on('messages.private', ({ privateMessage }) => {
      emit(newPrivateMessage({ privateMessage }));
    });
    socket.on('error', ({ message }) => {
      emit(doubleNameError({ message }));
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

function* update(socket) {
  while (true) {
    const { payload } = yield take(`${addReaction}`);
    socket.emit('likedMessage', payload);
  }
}

function* userIsTyping(socket) {
  while (true) {
    const { payload } = yield take(`${typing}`);
    socket.emit('typing', payload);
  }
}

function* writePrivateMsg(socket) {
  while (true) {
    const { payload } = yield take(`${sendPrivateMessage}`);
    socket.emit('privateMessage', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(update, socket);
  yield fork(userIsTyping, socket);
  yield fork(writePrivateMsg, socket);
}

/*
  `loginFlow` saga watches for login and logout events.
  While a user is logged in, loginFlow manages IO process.
  When a user logs out, the logout action is fired and is picked up
  by our saga which then cancels the task.
*/

function* loginFlowSockets() {
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
  yield fork(loginFlowSockets);
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(registerFlow);
}
