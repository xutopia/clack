import { createReducer } from 'redux-act';
import { addUser, removeUser, typingStatus } from '../actions/actions'
import initial from '../reducers/initial'

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: { status: true, typingStatus: false } };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  },
  [typingStatus]: (state, payload) => {
    return { ...state, [payload.user]: payload }
  },
}, initial.users);

export default users
