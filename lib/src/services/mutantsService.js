const { forbiddenError } = require('../../utils/functions')

const STRING_LENGHT = 4
const STRINGS_FOR_MUTANT = 2

function evalHorizontal(i, j, arr) {
  let result = 1
  const maxIndexToEvaluate = j + STRING_LENGHT
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
  const maxIndexToEvaluate = i + STRING_LENGHT

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
  const maxIndexXToEvaluate = i + STRING_LENGHT
  const maxIndexYToEvaluate = j + STRING_LENGHT
  
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
  const maxIndexXToEvaluate = i + STRING_LENGHT
  const maxIndexYToEvaluate = j - STRING_LENGHT
  
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

async function evaluateDna(dna) {
  let stringCounter = 0
  
  // TODO load create or update muntant in db

  // If the array size is lower than the required lenght to be mutant is not possible to get a positive value
  if (dna.lenght < STRING_LENGHT) {
    throw forbiddenError('Is not a mutant')
  }

  // Evaluataiton of every letter of every row until we get a positive result
  dna.some((row, i) => {
    row.some((_, j) => {
      stringCounter += evaluateItem(i, j, dna)
      return stringCounter >= STRINGS_FOR_MUTANT
    })

    return stringCounter >= STRINGS_FOR_MUTANT
  })

  const isMutant = stringCounter >= STRINGS_FOR_MUTANT

  if (!isMutant) {
    throw forbiddenError('Is not a mutant')
  }

  return isMutant
}

module.exports = {
  evaluateDna,
}
