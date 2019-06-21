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
      expect(res.body[0]).toMatchObject({ id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
    })

    test('GET /games - return empty array if no games', async () => {
      await db('games').del()
      const res = await supertest(app).get('/games')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.length).toBe(0)
    })

    test('POST /games - success', async () => {
      const res = await supertest(app).post('/games').send({ title: 'World of Warcraft', genre: 'MMORPG', releaseYear: 2004 })
      expect(res.status).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.title).toBe('World of Warcraft')
      expect(res.body.releaseYear).toBe(2004)
    })

    test('POST /games - missing request body', async () => {
      const res = await supertest(app).post('/games')
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Missing request body' } })
    })

    test('POST /games - missing request body fields', async () => {
      const res_missing_title = await supertest(app).post('/games').send({ title: 'World of Warcraft' })
      expect(res_missing_title.status).toBe(422)
      expect(res_missing_title.type).toBe('application/json')
      expect(res_missing_title.body).toBeTruthy()
      expect(res_missing_title.body).toMatchObject({ error: { message: 'Missing fields: genre' } })

      const res_missing_genre = await supertest(app).post('/games').send({ genre: 'MMORPG' })
      expect(res_missing_genre.status).toBe(422)
      expect(res_missing_genre.type).toBe('application/json')
      expect(res_missing_genre.body).toBeTruthy()
      expect(res_missing_genre.body).toMatchObject({ error: { message: 'Missing fields: title' } })
    })

    test('GET /games/:id - success', async () => {
      const res = await supertest(app).get('/games/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
    })

    test('GET /games/:id - not found', async () => {
      const res = await supertest(app).get('/games/x9000')
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Game not found' } })
    })

    test.todo('PUT /games/:id - success')
    test.todo('PUT /games/:id - not found')
    test.todo('DELETE /games/:id - success')
    test.todo('DELETE /games/:id - not found')
  })
})
