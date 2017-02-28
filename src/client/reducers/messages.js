import { createReducer } from 'redux-act';
import { newMessage, sendUpdatedReaction } from '../actions/actions'
import initial from '../reducers/initial'

const messages = createReducer({
// newMessage updates state, triggers an event
  [newMessage]: (state, payload) => {
    const { message } = payload;
    return {
      ...state,
      list: [ ...state.list, message.id ],
      entities: { ...state.entities, [message.id]: message }
    };
  },
  [sendUpdatedReaction]: (state, payload) => {
    let newState = {};
    newState = Object.assign(newState, state);
    const messageId = payload.likedMessage.id;
    const likesCount = payload.likedMessage.reactions.likes;
    let objToUpdate = newState.entities[messageId];
    objToUpdate.reactions.likes = likesCount;
    return newState;
  }
}, initial.messages);

export default messages
