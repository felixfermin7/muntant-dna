const md5 = require('md5')
const MuntantsHelper = require('../helpers/muntantsHelper')
const MutantsRepository = require('../repositories/mutantsRepository')
const { forbiddenError } = require('../../utils/functions')
const { STRING_LENGTH, STRINGS_FOR_MUTANT } = require('../../config')

async function evaluateDna(dna, unProcessedDna) {
  let stringCounter = 0
  const mutantId = md5(JSON.stringify(unProcessedDna))

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

  await MutantsRepository.upsert({
    id: mutantId,
    dna: unProcessedDna,
    is_mutant: isMutant,
  })

  if (!isMutant) {
    throw forbiddenError('Is not a mutant')
  }

  return isMutant
}

async function getStats() {
  const [analizedMutants, certifiedMutants] = await Promise.all([
    MutantsRepository.countAll(),
    MutantsRepository.countMuntants(),
  ])

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
