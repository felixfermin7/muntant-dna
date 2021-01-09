const MutantsService = require('../services/mutantsService')
const { evaluateDnaSchema } = require('../schemas/mutantsSchemas')
const {
  parseResponse,
  validSchema,
  validateEvaludateDnaData,
  errorHandler,
} = require('../../utils/functions')

async function evaluateDna(event) {
  try {
    const { body } = event
    const params = JSON.parse(body)

    //Validation of the received data format
    await validSchema(evaluateDnaSchema, params)

    //Validation and map of the received data content
    const validatedData = validateEvaludateDnaData(params.dna)

    await MutantsService.evaluateDna(validatedData, params.dna)

    return parseResponse(200)
  } catch (e) {
    console.log(e)
    return errorHandler(e, 'Could not evaluate mutant')
  }
}

async function getStats() {
  try {
    const response = await MutantsService.getStats()

    return parseResponse(200, response)
  } catch (e) {
    console.log(e)
    return errorHandler(e, 'Could not evaluate mutant')
  }
}

module.exports = {
  evaluateDna, getStats
}
