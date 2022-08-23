require('dotenv').config()

module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    host: process.env.APP_DB_HOST
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory:'./src/db/migrations'
  }

};
