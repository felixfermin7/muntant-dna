const { MUTANTS } = require('./tableNames')
const db = require('../../utils/db')

async function insertMany(mutants) {
  const { database, connection } = await db.get()
  const collection = database.collection('mutants')

  const response = await collection.insertMany(mutants)
  await connection.close()

  return response
}

async function deleteAll() {
  const { database, connection } = await db.get()
  const collection = database.collection('mutants')

  const response = await collection.deleteMany()
  await connection.close()

  return response
}

async function upsert(mutant) {
  const { id, ...data } = mutant
  const { database, connection } = await db.get()
  const collection = database.collection('mutants')

  const response = await collection.updateOne({ id }, { $set: { ...data } }, { upsert: true })
  await connection.close()

  return response
}

async function countAll() {
  const { database, connection } = await db.get()
  const collection = database.collection('mutants')
  const cursor = collection.find()
  const count = await cursor.count()

  await connection.close()

  return count
}

async function countMuntants() {
  const { database, connection } = await db.get()
  const collection = database.collection('mutants')
  const cursor = collection.find({ is_mutant: true })
  const count = await cursor.count()

  await connection.close()

  return count
}

module.exports = {
  countAll,
  countMuntants,
  deleteAll,
  insertMany,
  upsert,
}
