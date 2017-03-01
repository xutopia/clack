import { createAction } from 'redux-act';

export const login = createAction('login');
export const logout = createAction('logout');

export const addUser = createAction('add user');
export const removeUser = createAction('remove user');

export const isTyping = createAction('isTyping');
export const currentlyTyping = createAction('currentlyTyping');

export const newMessage = createAction('new message');
export const sendMessage = createAction('send message');

export const searchMessages = createAction('new search');

export const addReaction = createAction('add reaction');
export const sendUpdatedReaction = createAction('updated reaction');

export const sendPrivateMessage = createAction('send private message');
export const newPrivateMessage = createAction('new private message');

export const doubleNameError = createAction('duplicate name');
export const addToUsernames = createAction('add to usernames array');
export const removeFromUsernames = createAction('remove from usernames array');
