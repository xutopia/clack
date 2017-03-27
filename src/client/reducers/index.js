import { combineReducers } from 'redux'

import app from './app';
import users from './users';
import messages from './messages';
import search from './search';
import usernames from './usernames';

export default combineReducers(
  { app, users, messages, search, usernames }
);
