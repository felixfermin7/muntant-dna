const Joi = require('joi')

const evaluateDnaSchema = Joi.object({
  dna: Joi.array()
    .items(Joi.string()).required()
})

module.exports = {
  evaluateDnaSchema,
}
