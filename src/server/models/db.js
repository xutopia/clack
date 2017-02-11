const host = process.env.RDS_HOSTNAME || 'localhost';
const user = process.env.RDS_USERNAME || 'root';
const password = process.env.RDS_PASSWORD || '1234';
const port = process.env.RDS_PORT || '3306';

const knex = require('knex')({ client: 'mysql',
  connection: {
    database: 'clack_rds',
    host,
    user,
    password,
    port,
  },
});

module.exports = knex;
