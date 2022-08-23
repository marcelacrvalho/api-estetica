
exports.up = function(knex) {
    return knex.schema.createTable('hours',function(table){
        table.increments('id').primary()
        table.string('hour').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hours');
};
