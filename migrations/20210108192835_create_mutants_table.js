const { MUTANTS } = require('../lib/src/repositories/tableNames')

module.exports.up = knex =>
  knex.schema.createTable(MUTANTS, table => {
    table.string('id').primary()
    table.specificType('dna', 'varchar[]').notNullable()
    table.bool('is_mutant').notNullable()
    table.timestamps(true, true)
  })

module.exports.down = knex => knex.schema.dropTable(MUTANTS)
