import { SET_CURRENT_ROOM } from './../actions/actionTypes'

const initialState = {
  currentRoom: '',
  rooms: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.currentRoom,
        room: action.rooms,
      }
    default:
      return state
  }
}
