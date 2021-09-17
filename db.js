const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  },
  pool: { min: 0, max: 10 },
})

module.exports = knex
