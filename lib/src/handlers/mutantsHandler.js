const MutantsService = require('../services/mutantsService')
const { evaluateDnaSchema } = require('../schemas/mutantsSchemas')
const { parseResponse, validSchema } = require('../../utils/functions')

async function evaluateDna(event) {
  try {
    const { body } = event
    const params = JSON.parse(body)
   
    await validSchema(evaluateDnaSchema, params)
   
    // TODO validate array and strings lenght

    const response = await MutantsService.evaluateDna(params.dna)

    return parseResponse(200, response)
  } catch (e) {
    return e && e.code && e.statusCode
      ? parseResponse(e.code, { message: e.error.message, code: e.statusCode })
      : parseResponse(500, { message: 'Could not evaluate mutant', code: 'InternalServerError' })
  }
}

module.exports = {
  evaluateDna,
}
