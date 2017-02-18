// database queries for messages
import { db } from '../db/knexfile';

export const createMessage = (data, callback) => {
  const message = data; // TODO: modify the `data` argument to extract the message string

  return db('messages').insert({
    message,
  })
  .then((success) => {
    console.log('message stored to database');
    callback(success);
  })
  .catch((err) => {
    callback(err);
  });
};

export const fetchMessages = (params, callback) => (
  db.select().table('messages')
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    callback(err);
  })
);
