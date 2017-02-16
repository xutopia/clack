// Basic testing to make sure models are set-up properly
import dotenv from 'dotenv';
import knex from 'knex';


dotenv.config();
const host = process.env.RDS_HOSTNAME || 'localhost';
const user = process.env.RDS_USERNAME || 'root';
const password = process.env.RDS_PASSWORD || '1234';
const port = process.env.RDS_PORT || '3306';

const db = knex({
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    port,
    database: 'clack_rds',
  },
  migrations: {
    tableName: 'knex_migrations',
  },
});

describe('Database queries using knex', () => {

  it('Should fetch all the users from database', () => {
    db.raw(`SELECT * FROM users`)
    .then((usernames) => {
      expect(usernames).toBe('object');
    });
  });
});
