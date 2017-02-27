import { createReducer } from 'redux-act';
import { login, logout } from '../actions/actions'
import initial from '../reducers/initial'

const app = createReducer({
  [login]: (state, payload) => {
    return { ...state, username: payload.username, usernames: payload.usernames };
  },
  [logout]: (state, payload) => {
    return { ...state, username: null };
  },
}, initial.app);

export default app
