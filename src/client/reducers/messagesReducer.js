import { SET_CURRENT_ROOM_MESSAGES } from '../actions/actionTypes'

const initialState = {
  currentRoom: 'default',
  messages: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM_MESSAGES:
      return {
        ...state,
      }
    default:
      return state
  }
}
