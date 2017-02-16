// The actual db queries for the user
import db from '../db/knexfile';

const createUser = (data, callback) => {
  const name = data; // TODO: modify the `data` argument to match username field entries in users table
  return db('users').where({
    username: name
  }).select('*')
  .then((usernames) => {
    if (usernames.length === 0) {
      db('users').insert({
        username: name,
      })
      .then((newUser) => {
        console.log(`user ${newUser} created`);
        callback(newUser);
      });
    } else {
      console.log(`user ${name} already exists`);
      callback();
    }
  })
  .catch((err) => {
    console.log(`Error selecting user from database: ${err}`);
    callback(err);
  });
};

export default createUser;
