import { SET_CURRENT_USER } from './../actions/actionTypes'

let initialState = {
  currentUser: ''
}

const mainReducer = (state = initialState, action) => {
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

export default mainReducer
