import { createAction } from 'redux-act';

// old 'login' using sockets...will be deprecated
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


// new auth using simple bcrypt
export const sendingRequest = createAction('sending auth request');
export const loginRequest = createAction('login request');
export const registerRequest = createAction('registration request');
export const setAuth = createAction('set auth');
export const logoutRequest = createAction('logout request');
export const changeForm = createAction('change form');
export const requestError = createAction('request error');

export const sendPrivateMessage = createAction('send private message');
export const newPrivateMessage = createAction('new private message');

export const doubleNameError = createAction('duplicate name');
export const addToUsernames = createAction('add to usernames array');
export const removeFromUsernames = createAction('remove from usernames array');
