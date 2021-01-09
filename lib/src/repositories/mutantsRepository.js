const { MUTANTS } = require('./tableNames')
const db = require('../../utils/db')

function get(id) {
  return db(MUTANTS)
    .select('*')
    .where({ id })
    .first()
}

function create(mutant) {
  return db(MUTANTS)
    .insert(mutant)
    .returning('*')
}

function update(id, data) {
  return db(MUTANTS)
    .update({
      ...data,
      updated_at: db.raw('NOW()')
    })
    .where({ id })
    .returning('*')
}

function getAll() {
  return db(MUTANTS)
    .select('*')
}

module.exports = {
  create,
  get,
  getAll,
  update,
}
