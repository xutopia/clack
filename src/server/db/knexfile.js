// Note that the sensitive data for this connection is stored in the .env file.
import knex from 'knex';
import dotenv from 'dotenv';

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
export default db;


// module.exports = {
//
//   development: {
//     client: 'mysql',
//     connection: {
//       database: 'clack_rds',
//       host,
//       user,
//       password,
//       port,
//     },
//   },
//
//   migrations: {
//     tableName: 'knex_migrations',
//   },
// };
