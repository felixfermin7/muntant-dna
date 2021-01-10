const md5 = require('md5')
const MuntantsHelper = require('../helpers/muntantsHelper')
const MutantsRepository = require('../repositories/mutantsRepository')
const { forbiddenError } = require('../../utils/functions')
const { STRING_LENGTH, STRINGS_FOR_MUTANT } = require('../../config')

async function evaluateDna(dna, unProcessedDna) {
  let stringCounter = 0
  const mutantId = md5(JSON.stringify(unProcessedDna))
  const mutant = await MutantsRepository.get(mutantId)

  // If the array size is lower than the required length to be mutant is not possible to get a positive value
  if (dna.length >= STRING_LENGTH) {
    // Evaluation of every letter of every row until we get a positive result
    dna.some((row, i) => {
      row.some((_, j) => {
        stringCounter += MuntantsHelper.evaluateItem(i, j, dna)
        return stringCounter >= STRINGS_FOR_MUTANT
      })

      return stringCounter >= STRINGS_FOR_MUTANT
    })
  }

  const isMutant = stringCounter >= STRINGS_FOR_MUTANT

  mutant
    ? await MutantsRepository.update(mutantId, { is_mutant: isMutant })
    : await MutantsRepository.create({ id: mutantId, dna: unProcessedDna, is_mutant: isMutant })

  if (!isMutant) {
    throw forbiddenError('Is not a mutant')
  }

  return isMutant
}

async function getStats() {
  const mutantsData = await MutantsRepository.getAll()
  const analizedMutants = mutantsData.length

  const certifiedMutants = mutantsData.reduce((a, b) => (a + b.is_mutant ? 1 : 0), 0)

  return {
    count_mutant_dna: certifiedMutants,
    count_human_dna: analizedMutants,
    ratio: Math.round((certifiedMutants / analizedMutants) * 100) / 100 || 0,
  }
}

module.exports = {
  evaluateDna,
  getStats,
}
