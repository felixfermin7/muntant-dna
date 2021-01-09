const MutantsService = require('../services/mutantsService')
const { evaluateDnaSchema } = require('../schemas/mutantsSchemas')
const { parseResponse, validSchema, validateEvaludateDnaData } = require('../../utils/functions')

async function evaluateDna(event) {
  try {
    const { body } = event
    const params = JSON.parse(body)
   
    //Validation of the received data format
    await validSchema(evaluateDnaSchema, params)
   
    //Validation of the received data content
    const validatedData = validateEvaludateDnaData(params.dna)

    await MutantsService.evaluateDna(validatedData)

    return parseResponse(200)
  } catch (e) {
    console.log(e)
    return e && e.code && e.statusCode
      ? parseResponse(e.code, { message: e.error.message, code: e.statusCode })
      : parseResponse(500, { message: 'Could not evaluate mutant', code: 'InternalServerError' })
  }
}

module.exports = {
  evaluateDna,
}
