const dbHost = process.env['DB_HOST'] || 'localhost'
const dbUser = process.env['DB_USER'] || 'postgres'
const dbName = process.env['DB_NAME'] || 'mutant_dna'
const dbPassword = process.env['DB_PASSWORD'] || 'postgres'
const dbPort = process.env['DB_PORT'] || 5432
const STRING_LENGTH = 4
const STRINGS_FOR_MUTANT = 2

const ALLOWED_LETTERS = Object.freeze({
  A: 'A',
  T: 'T',
  C: 'C',
  G: 'G',
})

const dbConnection = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
const stage = () => 'dev'

module.exports = {
  dbConnection,
  stage,
  STRING_LENGTH,
  STRINGS_FOR_MUTANT,
  ALLOWED_LETTERS,
}
