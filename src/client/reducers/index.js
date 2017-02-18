import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import messagesReducer from './messagesReducer'
import roomsReducer from './roomsReducer'

const RootReducer = combineReducers({
  users: usersReducer,
  rooms: roomsReducer,
  messages: messagesReducer,
})

export default RootReducer
