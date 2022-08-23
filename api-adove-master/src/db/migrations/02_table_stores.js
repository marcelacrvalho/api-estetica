
exports.up = function(knex) {
    return knex.schema.createTable('stores',function(table){
        table.increments('id').primary();
        table.string('name', 45).notNullable()
        table.string('email', 60).notNullable().unique()
        table.string('password', 120).notNullable()
        table.string('open', 40).defaultTo('De seg a sex, exceto feriados')
        table.string('payment', 30).defaultTo('Dinheiro, cartão e pix')
        table.string('category', 30).defaultTo('Estética')
        table.boolean('homecare').defaultTo(false)
        table.boolean('active').defaultTo(true)
        table.string('location', 80).defaultTo('Varginha, Minas Gerais').notNullable()
        table.string('neighborhood', 50)
        table.string('street', 50)
        table.string('number', 50)
        table.string('firebaseToken')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stores')
};
