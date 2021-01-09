const md5 = require('md5')
const MutantsRepository = require('../repositories/mutantsRepository')
const { forbiddenError } = require('../../utils/functions')

const STRING_LENGTH = 4
const STRINGS_FOR_MUTANT = 2

function evalHorizontal(i, j, arr) {
  let result = 1
  const maxIndexToEvaluate = j + STRING_LENGTH
  if (!arr[i][maxIndexToEvaluate - 1]) {
    return 0
  }

  for (let k = j + 1; k < maxIndexToEvaluate; k += 1) {
    if (arr[i][j] !== arr[i][k]) {
      result = 0
      break
    }

    if (result === STRINGS_FOR_MUTANT) {
      break
    }
  }

  return result
}

function evalVertical(i, j, arr) {
  let result = 1
  const maxIndexToEvaluate = i + STRING_LENGTH

  if (!arr[maxIndexToEvaluate - 1]) {
    return 0
  }

  for (let k = i + 1; k < maxIndexToEvaluate; k += 1) {
    if (arr[i][j] !== arr[k][j]) {
      result = 0
      break
    }

    if (result === STRINGS_FOR_MUTANT) {
      break
    }
  }

  return result
}

function evalLowerOblique(i, j, arr) {
  let result = 1
  let m = j + 1
  const maxIndexXToEvaluate = i + STRING_LENGTH
  const maxIndexYToEvaluate = j + STRING_LENGTH

  if (!arr[maxIndexXToEvaluate - 1] || !arr[maxIndexXToEvaluate - 1][maxIndexYToEvaluate - 1]) {
    return 0
  }

  for (let k = i + 1; k < maxIndexXToEvaluate; k += 1) {
    if (arr[i][j] !== arr[k][m]) {
      result = 0
      break
    }

    if (result === STRINGS_FOR_MUTANT) {
      break
    }
    m += 1
  }

  return result
}

function evalUpperOblique(i, j, arr) {
  let result = 1
  let m = j - 1
  const maxIndexXToEvaluate = i + STRING_LENGTH
  const maxIndexYToEvaluate = j - STRING_LENGTH

  if (!arr[maxIndexXToEvaluate - 1] || !arr[maxIndexXToEvaluate - 1][maxIndexYToEvaluate + 1]) {
    return 0
  }

  for (let k = i + 1; k < maxIndexXToEvaluate; k += 1) {
    if (arr[i][j] !== arr[k][m]) {
      result = 0
      break
    }

    if (result === STRINGS_FOR_MUTANT) {
      break
    }

    m -= 1
  }

  return result
}

const evaluateItem = (i, j, arr) =>
  evalHorizontal(i, j, arr) +
  evalVertical(i, j, arr) +
  evalUpperOblique(i, j, arr) +
  evalLowerOblique(i, j, arr)

async function evaluateDna(dna, unProcessedDna) {
  let stringCounter = 0
  const mutantId = md5(JSON.stringify(unProcessedDna))
  const mutant = await MutantsRepository.get(mutantId)

  // If the array size is lower than the required length to be mutant is not possible to get a positive value
  if (!dna.length < STRING_LENGTH) {
    // Evaluataiton of every letter of every row until we get a positive result
    dna.some((row, i) => {
      row.some((_, j) => {
        stringCounter += evaluateItem(i, j, dna)
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
