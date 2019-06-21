'use strict'

/**
 * Dependencies
 */

const supertest = require('supertest')
const app = require('../../app')

/**
 * Assertions
 */

describe('routes', () => {
  describe('root_router.js', () => {
    test('GET / - success', async () => {
      const res = await supertest(app).get('/')
      expect(res.status).toBe(200)
    })
  })
})
