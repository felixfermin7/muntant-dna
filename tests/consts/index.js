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
  validEvaluateDnaMutantTwoITRequest,
  validEvaluateDnaMutantOneITRequest,
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
  validEvaluateDnaMutantTwoITRequest,
  validEvaluateDnaMutantOneITRequest,
}
