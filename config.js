const {
  dbHost = 'localhost',
  dbUser = 'postgres',
  dbName = 'mutant_dna',
  dbPassword = 'postgres',
  dbPort = 5432,
} = process.env

const dbConnection = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`

module.exports = {
  dbConnection,
}
