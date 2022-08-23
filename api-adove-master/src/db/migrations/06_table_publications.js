
exports.up = function (knex) {
  return knex.schema.createTable('publications', function (table) {
    table.increments('id').primary()
    table.string('title', 40).notNullable()
    table.string('text', 2000).notNullable()
    table.string('image', 900)
    table.timestamp('date').defaultTo(knex.fn.now());
  });

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('publications');
};
