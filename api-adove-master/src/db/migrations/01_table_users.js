
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary()
        table.string('name', 45).notNullable()
        table.string('email', 60).notNullable().unique()
        table.string('password', 120).notNullable()
        table.string('location', 80)
        table.string('neighborhood', 50)
        table.string('street', 50)
        table.string('number', 50)
        table.string('firebaseToken')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
