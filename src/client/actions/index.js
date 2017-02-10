// import axios from 'axios'; // Just in case we need it to make requests

export const CREATE_USER = 'CREATE_USER';

export function createUser(name) {
  // some action here that will register the user input in the database
  console.log('inside the first action');
  return {
    type: CREATE_USER,
    payload: 'a string for now'
  }
};
