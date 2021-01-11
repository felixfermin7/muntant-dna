const assert = require('assert')
const sinon = require('sinon')
const MutantsHandler = require('../../src/handlers/mutantsHandler')
const MutantsService = require('../../src/services/mutantsService')
const MuntantsHelper = require('../../src/helpers/muntantsHelper')
const MutantsRepository = require('../../src/repositories/mutantsRepository')

const {
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
} = require('../consts')

let sandbox

describe('Muntatns handlers tests', () => {
  describe('evaluateDna function', () => {
    let evaluateDnaSpy
    let evaluateItemSpy
    beforeEach(async () => {
      sandbox = sinon.createSandbox()
      evaluateDnaSpy = sandbox.spy(MutantsService, 'evaluateDna')
      evaluateItemSpy = sandbox.spy(MuntantsHelper, 'evaluateItem')
    })

    afterEach(() => {
      sandbox.restore()
    })

    describe('When calling with empty body', () => {
      it('Should get 400 "dna" is required', async () => {
        const response = await MutantsHandler.evaluateDna()
        assert.strictEqual(response.statusCode, 400)
        assert.strictEqual(JSON.parse(response.body).message, '"dna" is required')
        assert.strictEqual(evaluateDnaSpy.called, false)
      })
    })

    describe('When calling with invalid dna field', () => {
      it('Should get 400 "dna" must be an array', async () => {
        const response = await MutantsHandler.evaluateDna(invalidEvaluateDnaFieldRequest)
        assert.strictEqual(response.statusCode, 400)
        assert.strictEqual(JSON.parse(response.body).message, '"dna" must be an array')
        assert.strictEqual(evaluateDnaSpy.called, false)
      })
    })

    describe('When calling with invalid dna array field', () => {
      it('Should get 400 "dna[0]" must be a string', async () => {
        const response = await MutantsHandler.evaluateDna(invalidEvaluateDnaArrayFieldRequest)
        assert.strictEqual(response.statusCode, 400)
        assert.strictEqual(JSON.parse(response.body).message, '"dna[0]" must be a string')
        assert.strictEqual(evaluateDnaSpy.called, false)
      })
    })

    describe('When calling with invalid dna array field letter', () => {
      it('Should get 400 Invalid dna letter', async () => {
        const response = await MutantsHandler.evaluateDna(invalidEvaluateDnaArrayFieldLetterRequest)
        assert.strictEqual(response.statusCode, 400)
        assert.strictEqual(JSON.parse(response.body).message, 'Invalid dna letter')
        assert.strictEqual(evaluateDnaSpy.called, false)
      })
    })

    describe('When calling with invalid dna array field size', () => {
      it('Should get 400 Invalid dna size NxN', async () => {
        const response = await MutantsHandler.evaluateDna(invalidEvaluateDnaArrayFieldSizeRequest)
        assert.strictEqual(response.statusCode, 400)
        assert.strictEqual(JSON.parse(response.body).message, 'Invalid dna size NxN')
        assert.strictEqual(evaluateDnaSpy.called, false)
      })
    })

    describe('When calling with valid dna mutant field', () => {
      it('Should get 200', async () => {
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaMutantRequest)
        assert.strictEqual(response.statusCode, 200)
        assert.strictEqual(evaluateDnaSpy.called, true)
        assert.strictEqual(evaluateItemSpy.callCount, 5)
      })
    })

    describe('When calling with valid dna mutant field 2 iterations', () => {
      it('Should get 200', async () => {
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaMutantTwoITRequest)
        assert.strictEqual(response.statusCode, 200)
        assert.strictEqual(evaluateDnaSpy.called, true)
        assert.strictEqual(evaluateItemSpy.callCount, 2)
      })
    })

    describe('When calling with valid dna mutant field 1 iteration', () => {
      it('Should get 200', async () => {
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaMutantOneITRequest)
        assert.strictEqual(response.statusCode, 200)
        assert.strictEqual(evaluateDnaSpy.called, true)
        assert.strictEqual(evaluateItemSpy.callCount, 1)
      })
    })

    describe('When calling with valid dna no mutant field ', () => {
      it('Should get 403 Is not a mutant', async () => {
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaNoMutantRequest)
        assert.strictEqual(response.statusCode, 403)
        assert.strictEqual(JSON.parse(response.body).message, 'Is not a mutant')
        assert.strictEqual(evaluateDnaSpy.called, true)
        assert.strictEqual(evaluateItemSpy.callCount, 36)
      })
    })

    describe('When calling with valid short dna no mutant field ', () => {
      it('Should get 403 Is not a mutant', async () => {
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaShortNoMutantRequest)
        assert.strictEqual(response.statusCode, 403)
        assert.strictEqual(JSON.parse(response.body).message, 'Is not a mutant')
        assert.strictEqual(evaluateDnaSpy.called, true)
        assert.strictEqual(evaluateItemSpy.called, false)
      })
    })

    describe('When calling with valid dna and get unexpected error ', () => {
      it('Should get 500 Could not evaluate mutant', async () => {
        sandbox.stub(MutantsRepository, 'upsert').rejects()
        const response = await MutantsHandler.evaluateDna(validEvaluateDnaNoMutantRequest)
        assert.strictEqual(response.statusCode, 500)
        assert.strictEqual(JSON.parse(response.body).message, 'Could not evaluate mutant')
        assert.strictEqual(evaluateDnaSpy.called, true)
      })
    })
  })

  describe('getStats function', () => {
    beforeEach(async () => {
      sandbox = sinon.createSandbox()
      await MutantsRepository.deleteAll()
    })

    afterEach(() => {
      sandbox.restore()
    })

    describe('When calling with fill db', () => {
      it('Should get 200', async () => {
        await MutantsRepository.insertMany(mutantsData)
        const response = await MutantsHandler.getStats()
        assert.strictEqual(response.statusCode, 200)
        assert.deepStrictEqual(JSON.parse(response.body), getStatsValidResponse)
      })
    })

    describe('When calling with empty db', () => {
      it('Should get 200', async () => {
        const response = await MutantsHandler.getStats()
        assert.strictEqual(response.statusCode, 200)
        assert.deepStrictEqual(JSON.parse(response.body), getStatsEmptyValidResponse)
      })
    })

    describe('When calling and get unexpected error', () => {
      it('Should get 500 Could not get stats', async () => {
        sandbox.stub(MutantsRepository, 'countAll').rejects()
        const response = await MutantsHandler.getStats()
        assert.strictEqual(response.statusCode, 500)
        assert.strictEqual(JSON.parse(response.body).message, 'Could not get stats')
      })
    })
  })
})
