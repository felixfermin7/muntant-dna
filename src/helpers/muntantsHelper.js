const { STRING_LENGTH } = require('../../config')

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
    m -= 1
  }

  return result
}

function evaluateItem(i, j, arr) {
  return (
    evalHorizontal(i, j, arr) +
    evalVertical(i, j, arr) +
    evalUpperOblique(i, j, arr) +
    evalLowerOblique(i, j, arr)
  )
}

module.exports = {
  evaluateItem,
}
