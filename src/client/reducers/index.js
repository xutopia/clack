import { combineReducers } from 'redux'

import app from './app';
import users from './users';
import messages from './messages';

export default combineReducers(
  { app, users, messages }
);
