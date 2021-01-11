const dbHost = process.env['DB_HOST'] || 'localhost'
const dbUser = process.env['DB_USER'] || ''
const dbPassword = process.env['DB_PASSWORD'] || ''
const dbName = process.env['DB_NAME'] || 'mutant_dna'
const dbPort = process.env['DB_PORT'] || 27017
const STRING_LENGTH = 4
const STRINGS_FOR_MUTANT = 2

const ALLOWED_LETTERS = Object.freeze({
  A: 'A',
  T: 'T',
  C: 'C',
  G: 'G',
})

const stage = () => 'local'

const dbConnection =
  stage() === 'local'
    ? `mongodb://${dbHost}:${dbPort}`
    : `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?ssl=true&replicaSet=atlas-smjcbk-shard-0&authSource=admin&retryWrites=true&w=majority`

module.exports = {
  dbConnection,
  stage,
  STRING_LENGTH,
  STRINGS_FOR_MUTANT,
  ALLOWED_LETTERS,
}
