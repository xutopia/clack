//need to put code for schemas here

// exports.up = function(knex, Promise) {
//   return Promise.all([knex.schema.createTableIfNotExists('users', function (table) {
//     table.increments('userid');
//     table.string('username').unique();
//     table.string('password');
//   }),
//   knex.schema.createTableIfNotExists('goals', function(table) {
//     table.increments('goalid');
//     table.string('goal');
//     table.text('description');
//     table.string('status');
//     table.timestamps();
//     table.integer('iduser').references('userid').inTable('users');
//   })]);
// };
//
// exports.down = function(knex, Promise) {
//   return Promise.all([knex.schema.dropTable('users'), knex.schema.dropTable('goals')]);
// };
