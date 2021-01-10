const dbHost = process.env['DB_HOST'] || 'localhost'
const dbUser = process.env['DB_USER'] || 'postgres'
const dbName = process.env['DB_NAME'] || 'mutant_dna'
const dbPassword = process.env['DB_PASSWORD'] || 'postgres'
const dbPort = process.env['DB_PORT'] || 5432

const dbConnection = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
const stage = () => 'dev'

module.exports = {
  dbConnection,
  stage,
}
