// Basic testing to make sure models are set-up properly
import knex from 'knex';
import db from '../../server/db/knexfile';
import { createUser, fetchUsers } from '../../server/user/userModel';
import { createMessage, fetchMessages } from '../../server/messages/messagesModel';

describe('Database queries using knex for users', () => {
  it('Should fetch all the users from database', async () => {
    const expected = [{ password: null, userid: 1, username: 'michelle' }];
    const users = await fetchUsers(null, (data) => {
      expect(data).toEqual(expect.arrayContaining(expected));
    });
  });

  it('Should reject the insert query if username already exists', async () => {
    const newEntry = 'bob';
    const expectedExisting = [{ password: null, userid: 4, username: 'bob' }];
    await createUser(newEntry, (results) => {
      expect(results).toEqual(expect.arrayContaining(expectedExisting));
    });
  });
});

describe('Database queries using knex for messages', () => {
  it('Should fetch all the messages from database', async () => {
    await fetchMessages(null, (messages) => {
      expect(messages.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('Should reject the insert query if username already exists', async () => {
    const newMessage = 'Hello World';
    await createMessage(newMessage, (results) => {
      expect(results).toBeTruthy();
    });
  });
});
