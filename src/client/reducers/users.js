import { createReducer } from 'redux-act';
import { addUser, removeUser } from '../actions/actions'
import initial from '../reducers/initial'

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: true };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  }
}, initial.users);

export default users
