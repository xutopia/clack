import { FETCH_USERLIST } from './../actions/userlistAction';

const userlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERLIST:
      return {
        ...state,
        users: action.users,
      }
    default:
      return state
  }
}

export default userlistReducer;
