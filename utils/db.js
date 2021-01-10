const knex = require('knex')
const { dbConnection } = require('../config')

const DB = knex({
  client: 'pg',
  connection: dbConnection,
})

module.exports = DB
