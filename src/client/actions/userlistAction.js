import { FETCH_USERLIST } from './actionTypes';

const fetchUserlist = () => (
  // make request through sockets for fetchAllUsers on the backend
  // receive data/payload from backend, then return object to reducer
  return {
    type: FETCH_USERLIST,
    payload
  }
);

export default fetchUserlist;
