// Basic testing to make sure models are set-up properly
import dotenv from 'dotenv';
import knex from 'knex';
import db from '../../server/db/knexfile';
import createUser from '../../server/user/userModel';


describe('Database queries using knex', () => {
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
