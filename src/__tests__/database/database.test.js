// Basic testing to make sure models are set-up properly
import dotenv from 'dotenv';
import knex from 'knex';
import db from '../../server/db/knexfile';
import createUser from '../../server/user/userModel';

// dotenv.config();
// const host = process.env.RDS_HOSTNAME || 'localhost';
// const user = process.env.RDS_USERNAME || 'root';
// const password = process.env.RDS_PASSWORD || '1234';
// const port = process.env.RDS_PORT || '3306';
//
// const db = knex({
//   client: 'mysql',
//   connection: {
//     host,
//     user,
//     password,
//     port,
//     database: 'clack_rds',
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//   },
// });

describe('Database queries using knex', () => {
  it('Should fetch all the users from database', () => {
    const expected = [{ password: null, userid: 1, username: 'michelle' }];
    db.raw(`SELECT * FROM users`)
    .then((usernames) => {
      expect(usernames[0]).toEqual(expect.arrayContaining(expected));
    });
  });

  it('Should add a new row to the database', () => {
    const expected = [{ password: null, userid: 2, username: 'tony' }];
    const newEntry = 'michelle';
    createUser(newEntry, (results) => {
      expect(results).toEqual(expect.arrayContaining(expected));
    });
  });
});
