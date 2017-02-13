import { CREATE_USER } from '../actions/index';

const INITIAL_STATE = { messages: [], user: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER: {
      return { ...state, user: action.payload.data };
    }
    default: {
      return state;
    }
  }
};
