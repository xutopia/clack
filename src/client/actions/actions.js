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
