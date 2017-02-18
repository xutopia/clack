import { SET_CURRENT_USER } from './../actions/actionTypes'
// does this file need to import the userlistReducer?

let initialState = {
  currentUser: '',
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      } // is this right?
    default:
      return state
  }
}

export default mainReducer
