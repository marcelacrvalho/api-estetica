
exports.up = function (knex) {
  return knex.schema.createTable('events', function (table) {
    table.increments('id').primary()
    table.integer('user').unsigned().notNullable()
    table.integer('store').unsigned().notNullable()
    table.integer('job').unsigned().notNullable()
    table.integer('hour').unsigned().notNullable()
    table.date('date').notNullable()

    table.foreign('user').references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
    table.foreign('store').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
    table.foreign('job').references('id').inTable('jobs').onDelete('cascade').onUpdate('cascade')
    table.foreign('hour').references('id').inTable('hours').onDelete('cascade').onUpdate('cascade')
  })

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('events');
};
