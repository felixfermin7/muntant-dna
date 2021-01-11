const { dbConnection } = require('../config')
const MongoClient = require('mongodb').MongoClient

// Database Name
const dbName = 'muntant_dna'

async function get() {
  const client = new MongoClient(dbConnection)
  await client.connect()
  const database = client.db(dbName)
  await database.command({ ping: 1 })
  console.log('Connected successfully to server')

  return { database, connection: client }
}

module.exports = {
  get,
}
