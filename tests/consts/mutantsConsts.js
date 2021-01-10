const invalidEvaluateDnaFieldRequest = {
  body: JSON.stringify({
    dna: '',
  }),
}

const invalidEvaluateDnaArrayFieldRequest = {
  body: JSON.stringify({
    dna: [1],
  }),
}

const invalidEvaluateDnaArrayFieldLetterRequest = {
  body: JSON.stringify({
    dna: ['PTGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  }),
}

const invalidEvaluateDnaArrayFieldSizeRequest = {
  body: JSON.stringify({
    dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA'],
  }),
}

const validEvaluateDnaMutantRequest = {
  body: JSON.stringify({
    dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  }),
}

const validEvaluateDnaMutantWithTwoHorizontalRequest = {
  body: JSON.stringify({
    dna: ['ATTTTA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  }),
}

const validEvaluateDnaNoMutantRequest = {
  body: JSON.stringify({
    dna: ['TTGCTA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  }),
}

const validEvaluateDnaShortNoMutantRequest = {
  body: JSON.stringify({
    dna: ['TTG', 'CAG', 'TTA'],
  }),
}

const getStatsValidResponse = { count_mutant_dna: 1, count_human_dna: 2, ratio: 0.5 }
const getStatsEmptyValidResponse = { count_mutant_dna: 0, count_human_dna: 0, ratio: 0 }

module.exports = {
  invalidEvaluateDnaFieldRequest,
  invalidEvaluateDnaArrayFieldRequest,
  invalidEvaluateDnaArrayFieldLetterRequest,
  invalidEvaluateDnaArrayFieldSizeRequest,
  validEvaluateDnaMutantRequest,
  validEvaluateDnaMutantWithTwoHorizontalRequest,
  validEvaluateDnaNoMutantRequest,
  getStatsValidResponse,
  validEvaluateDnaShortNoMutantRequest,
  getStatsEmptyValidResponse,
}
