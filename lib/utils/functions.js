const ALLOWED_LETTERS = {
  A: 'A',
  T: 'T',
  C: 'C',
  G: 'G',
}

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

const notFoundError = () => ({
  code: 404,
  statusCode: 'NotFound',
  error: new Error('Not Found'),
})

async function validSchema(schema, data) {
  try {
    await schema.validateAsync(data)

    return 'Is Valid'
  } catch (e) {
    throw {
      code: 400,
      statusCode: 'InvalidParams',
      error: new Error(e.message),
    }
  }
}

function validateEvaludateDnaData(dna) {
  const arrayLength = dna.length
  const response = dna.map(d => {
    if (d.length !== arrayLength) throw 'Invalid dna size NxN'

    const row = d.split('')

    if (row.find(r => !ALLOWED_LETTERS[r])) {
      throw 'Invalid dna letter'
    }

    return row
  })

  return response
}

module.exports = {
  notFoundError,
  parseResponse,
  validSchema,
  validateEvaludateDnaData,
}
