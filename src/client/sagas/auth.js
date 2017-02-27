import { hashSync } from 'bcryptjs';
import { take, call, put, fork, race } from 'redux-saga/effects';

import genSalt from '../auth/salt';
import auth from '../auth/';

import {
  sendingRequest,
  loginRequest,
  registerRequest,
  setAuth,
  logoutRequest,
  changeForm,
  requestError,
} from '../actions/actions';

// effect to handle authorization
export function* authorize({ username, password, isRegistering }) {
  // send an action telling redux we are sending a request.
  yield put({});
  // we then try to register or log the user in, depending on req.
  try {
    let salt = genSalt(username);
    let hash = genSalt(password, salt);
    let response;

    // depending on the auth event (register or login), we call the proper
    // function in the async auth module.
    if (isRegistering) {
      response = yield call(auth.register, username, hash);
    } else {
      response = yield call(auth.login, username, hash);
    }
    return response;
  } catch (error) {
    console.log('line 37, sagas/auth');
    yield put({});
    return false;
  } finally {
    // when finished, tell redux we are no longer in the middle of a request.
    yield put({});
  }
}

// effect to handle logging out
export function* logout() {
  yield put({});
  try {
    let response = yield call(auth.logout);
    yield put({});
    return response;
  } catch (error) {
    yield put({});
  }
}

export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    let request = yield take(LOGIN_REQUEST);
    let { username, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    let winner = yield race({
      auth: call(authorize, { username, password, isRegistering: false }),
      logout: take(LOGOUT),
    });
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({ type: SET_AUTH, newAuthState: true });
      yield put({
        type: CHANGE_FORM,
        newFormState: { username: '', password: '' },
      });
      forwardTo('/dashboard');
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put({ type: SET_AUTH, newAuthState: false });
      yield call(logout);
      forwardTo('/');
    }
  }
}

// logout saga
export function * logoutFlow () {
  while (true) {
    yield take({})
    yield put({})
    yield call(logout)
    forwardTo('/')
  }
}
