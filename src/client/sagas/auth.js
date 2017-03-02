import { hashSync } from 'bcryptjs';
import { take, call, put, fork, race } from 'redux-saga/effects';

import genSalt from '../util/auth/salt';
import auth from '../util/auth';

import {
  sendingRequest,
  loginRequest,
  registerRequest,
  setAuth,
  logoutRequest,
  changeForm,
  requestError
} from '../actions/actions';

// effect to handle authorization
export function* authorize({ username, password, isRegistering }) {
  // send an action telling redux we are sending a request.
  yield put(sendingRequest);
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
    let request = yield take(loginRequest);
    let { username, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    let winner = yield race({
      auth: call(authorize, { username, password, isRegistering: false }),
      logout: take(logoutRequest)
    });
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put(setAuth(true));
      yield put(changeForm({ username: '', password: '' }));
      forwardTo('/room');
      // If `logout` won...
    } else if (winner.logout) {
      // ...we send Redux appropiate action
      yield put(setAuth(false));
      yield call(logout);
      forwardTo('/');
    }
  }
}

// logout saga
export function* logoutFlow() {
  while (true) {
    yield take(logoutRequest);
    yield put(setAuth({ newAuthState: false }));
    yield call(logout);
    forwardTo('/');
  }
}

export function* registerFlow() {
  while (true) {
    // We always listen to `REGISTER_REQUEST` actions
    let request = yield take(registerRequest);
    let { username, password } = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    let wasSuccessful = yield call(authorize, {
      username,
      password,
      isRegistering: true
    });

    // If we could register a user, we send the appropiate actions
    if (wasSuccessful) {
      yield put(setAuth({ newAuthState: true }));
      yield put(changeForm({ newFormState: { username: '', password: '' }}))
      forwardTo('/room');
    }
  }
}

// Helper to simplify redirects
function forwardTo(location) {
  browserHistory.push(location);
}
