const assert = require('assert')
const { dbConnection } = require('./config')

assert(dbConnection, 'dbConnection must be provided')

module.exports = {
  client: 'pg',
  connection: dbConnection,
  migrations: {
    directory: './migrations',
    tableName: 'migrations',
  },
}
