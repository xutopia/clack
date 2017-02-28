import { createReducer } from 'redux-act';
import { newPrivateMessage } from '../actions/actions'
import initial from '../reducers/initial'

const privateMessage = createReducer({
// newMessage updates state, triggers an event
  [newPrivateMessage]: (state, payload) => {
    const { privateMessage } = payload;
    return {
      ...state,
      list: [...state.list, privateMessage.id],
      entities: { ...state.entities, [privateMessage.id]: privateMessage }
    };
  }
}, initial.privateMessages);

export default privateMessage;
