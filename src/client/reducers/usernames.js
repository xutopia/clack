import { createReducer } from 'redux-act';
import { addToUsernames, removeFromUsernames } from '../actions/actions'
import initial from '../reducers/initial'

const usernames = createReducer({
  [addToUsernames]: (state, payload) => {
    return [...payload.usernames];
  },
  [removeFromUsernames]: (state, payload) => {
    return [...payload.usernames];
  },
}, initial.app.usernames);

export default usernames
