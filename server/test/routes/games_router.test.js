'use strict'

/**
 * Dependencies
 */

const supertest = require('supertest')
const app = require('../../app')
const db = require('../../db/client')

/**
 * Hooks
 */

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.migrate.rollback(null, true)
})

/**
 * Assertions
 */

describe('routes', () => {
  test('NODE_ENV=test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  describe('games_router.js', () => {
    test.todo('GET /game - not found') // 404 Not Found
    test.todo('GET /games - success')
    test.todo('GET /games - return empty array if no games')
    test.todo('POST /games - success')
    test.todo('POST /games - missing request body') // 422 Unprocessable Entity
    test.todo('POST /games - missing request body fields') // 422 Unprocessable Entity
    test.todo('POST /games - uniqueness conflict') // 409 Conflict
    test.todo('GET /games/:id - success')
    test.todo('GET /games/:id - not found')
    test.todo('PUT /games/:id - success')
    test.todo('PUT /games/:id - not found')
    test.todo('DELETE /games/:id - success')
    test.todo('DELETE /games/:id - not found')
  })
})
