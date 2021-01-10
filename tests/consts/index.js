const {
  invalidEvaluateDnaFieldRequest,
  invalidEvaluateDnaArrayFieldRequest,
  invalidEvaluateDnaArrayFieldLetterRequest,
  invalidEvaluateDnaArrayFieldSizeRequest,
  validEvaluateDnaMutantRequest,
  validEvaluateDnaNoMutantRequest,
  getStatsValidResponse,
  validEvaluateDnaShortNoMutantRequest,
  getStatsEmptyValidResponse,
} = require('./mutantsConsts')

const { mutantsData } = require('./tablesData')

module.exports = {
  invalidEvaluateDnaFieldRequest,
  invalidEvaluateDnaArrayFieldRequest,
  invalidEvaluateDnaArrayFieldLetterRequest,
  invalidEvaluateDnaArrayFieldSizeRequest,
  validEvaluateDnaMutantRequest,
  validEvaluateDnaNoMutantRequest,
  mutantsData,
  getStatsValidResponse,
  validEvaluateDnaShortNoMutantRequest,
  getStatsEmptyValidResponse,
}
