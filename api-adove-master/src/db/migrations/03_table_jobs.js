
exports.up = function (knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.increments('id').primary();
        table.integer('store').unsigned().notNullable()
        table.string('job', 40).notNullable()
        table.string('price', 40).notNullable()
        table.string('description', 120)
        table.string('category', 30).notNullable().defaultTo('Estética')
        table.string('location', 80).notNullable().defaultTo('Varginha, Minas Gerais')
        table.boolean('discount').defaultTo(false)

        table.foreign('store').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
    });

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('jobs')
}
