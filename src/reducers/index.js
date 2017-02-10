import {combineReducers} from 'redux';
import UserReducer from './user';

const rootReducer = combineReducers({
  // combine all reducers in the app into a single object
  user: UserReducer
});

export default rootReducer;
