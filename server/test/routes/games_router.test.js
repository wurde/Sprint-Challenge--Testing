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
    test('GET /game - not found', async () => {
      const res = await supertest(app).get('/game')
      expect(res.status).toBe(404)
    })

    test('GET /games - success', async () => {
      const res = await supertest(app).get('/games')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.length).toBe(3)
      expect(res.body[0]).toMatchObject({id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980})
    })

    test('GET /games - return empty array if no games', async () => {
      await db('games').del()
      const res = await supertest(app).get('/games')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.length).toBe(0)
    })

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
