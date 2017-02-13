var Promise = require('bluebird');

exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.raw('SET foreign_key_checks = 0;'),
  knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('userid');
    table.string('username').unique();
    table.string('password');
  }),
  knex.schema.createTableIfNotExists('messages', function (table) {
    table.increments('messageid');
    table.text('message');
    table.timestamp('timestamp');
    table.integer('iduser').unsigned();
    table.foreign('iduser').references('userid').inTable('users');
  })]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users'), knex.schema.dropTable('messages')]);
};
