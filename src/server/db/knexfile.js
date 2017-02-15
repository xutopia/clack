// Note that the sensitive data for this connection is stored in the .env file.
import database from 'knex';
import bookshelf from 'bookshelf';

const host = process.env.RDS_HOSTNAME || 'localhost';
const user = process.env.RDS_USERNAME || 'root';
const password = process.env.RDS_PASSWORD || '1234';
const port = process.env.RDS_PORT || '3306';

const knex = database({
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
export default bookshelf(knex);


module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'clack_rds',
      host,
      user,
      password,
      port,
    },
  },

  migrations: {
    tableName: 'knex_migrations',
  },
};
