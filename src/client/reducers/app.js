import { createReducer } from 'redux-act';
import { login, logout } from '../actions/actions'
import initial from '../reducers/initial'

const app = createReducer({
  [login]: (state, payload) => {
    return { ...state, username: payload.username };
  },
  [logout]: (state, payload) => {
    return { ...state, username: null, usernames: payload.usernames };
  },
}, initial.app);

export default app
