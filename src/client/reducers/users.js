import { createReducer } from 'redux-act';
import { addUser, removeUser, isTyping } from '../actions/actions'
import initial from '../reducers/initial'

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: true };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  },
  [isTyping]: (state, payload) => {
    return { ...state, isTyping: payload }
  },
}, initial.users);

export default users
