let initialState = {
  currentUser: ''
}

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}
