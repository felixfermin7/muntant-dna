const { ALLOWED_LETTERS } = require('../config')

const parseResponse = (status, body) => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  }
}

const errorHandler = (e, genericMessage) => {
  console.error(e)

  return e && e.code && e.statusCode
    ? parseResponse(e.code, { message: e.error.message, code: e.statusCode })
    : parseResponse(500, { message: genericMessage, code: 'InternalServerError' })
}

const notFoundError = () => ({
  code: 404,
  statusCode: 'NotFound',
  error: new Error('Not Found'),
})

const invalidParamsError = msg => ({
  code: 400,
  statusCode: 'InvalidParams',
  error: new Error(msg),
})

const forbiddenError = msg => ({
  code: 403,
  statusCode: 'Forbidden',
  error: new Error(msg),
})

async function validSchema(schema, data) {
  try {
    await schema.validateAsync(data)

    return 'Is Valid'
  } catch (e) {
    throw invalidParamsError(e.message)
  }
}

//This function validate the content of the data and creates an array of arrays
function validateEvaludateDnaData(dna) {
  const arrayLength = dna.length

  const response = dna.map(d => {
    if (d.length !== arrayLength) {
      throw invalidParamsError('Invalid dna size NxN')
    }

    const row = d.split('')

    if (row.find(r => !ALLOWED_LETTERS[r])) {
      throw invalidParamsError('Invalid dna letter')
    }

    return row
  })

  return response
}

module.exports = {
  errorHandler,
  forbiddenError,
  invalidParamsError,
  notFoundError,
  parseResponse,
  validateEvaludateDnaData,
  validSchema,
}
