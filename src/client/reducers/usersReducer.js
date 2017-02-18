import { SET_CURRENT_USER } from './../actions/actionTypes'

const initialState = {
  currentUser: '',
  loggedIn: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}
