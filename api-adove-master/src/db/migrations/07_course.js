
exports.up = function (knex) {
    return knex.schema.createTable('courses', function (table) {
      table.increments('id').primary()
      table.string('title', 40).notNullable()
      table.string('description', 900).notNullable()
      table.date('date').notNullable()
      table.string('price', 20).defaultTo('0')
      table.string('author', 80)
      table.string('city', 70)
      table.string('image', 900)
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('courses');
  };
  