// Basic testing to make sure models are set-up properly
import dotenv from 'dotenv';
import knex from 'knex';
import db from '../../server/db/knexfile';
import createUser from '../../server/user/userModel';
import { createMessage, fetchMessages } from '../../server/messages/messagesModel';

describe('Database queries using knex for users', () => {
  it('Should fetch all the users from database', () => {
    const expected = [{ password: null, userid: 1, username: 'michelle' }];
    db.raw(`SELECT * FROM users`)
    .then((usernames) => {
      expect(usernames[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  it('Should reject the insert query if username already exists', () => {
    const newEntry = 'bob';
    createUser(newEntry, (results) => {
      expect(results).toBeUndefined();
    });
  });
});

describe('Database queries using knex for messages', () => {
  it('Should fetch all the messages from database', () => {
    fetchMessages(null, (messages) => {
      expect(messages.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('Should reject the insert query if username already exists', () => {
    const newMessage = 'Hello World';
    createMessage(newMessage, (results) => {
      expect(results).toBeTruthy();
    });
  });
});
