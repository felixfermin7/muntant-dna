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

module.exports = {
  notFoundError,
  parseResponse,
  validSchema,
}
