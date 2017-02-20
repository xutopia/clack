import { createReducer } from 'redux-act';
import { newMessage } from '../actions/actions'
import initial from '../reducers/initial'

const messages = createReducer({
  [newMessage]: (state, payload) => {
    const { message } = payload;
    return {
      ...state,
      list: [ ...state.list, message.id ],
      entities: { ...state.entities, [message.id]: message }
    };
  }
}, initial.messages);

export default messages
