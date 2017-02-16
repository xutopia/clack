// The actual db queries for the user
import db from '../db/knexfile';

const createUser = (data, callback) => {
  // const { name } = data;

  return db.run(`SELECT * FROM users`)
  .then((usernames) => {
    console.log(usernames);
  });
};

createUser();

export default createUser;
