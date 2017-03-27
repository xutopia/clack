import { createReducer } from 'redux-act';
import { addUser, removeUser, currentlyTyping } from '../actions/actions'
import initial from '../reducers/initial'

const users = createReducer({
  [addUser]: (state, payload) => {
    return { ...state, [payload.username]: { userStatus: true, typingStatus: false, avatar: payload.avatar } };
  },
  [removeUser]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  },
  [currentlyTyping]: (state, payload) => {
    const newState = { ...state };
    delete newState[payload.user];
    return { ...newState, [payload.user]: { typingStatus: payload.typingStatus, userStatus: payload.userStatus, avatar: payload.avatar } };
  },
}, initial.users);

export default users
