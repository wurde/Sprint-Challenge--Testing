'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Game {
  static async all() {
    return await db('games')
  }

  static async create(game) {
    const [id] = await db('games').insert({
      title: game.title,
      genre: game.genre,
      releaseYear: game.releaseYear,
    })

    const new_game = await db('games').where({ id: id }).first()

    return new_game
  }

  static async find(filter) {
    return await db('games').where(filter).first()
  }

  static async update(id, game) {
    const changes = {}
    if (game.title) changes['title'] = game.title
    if (game.genre) changes['genre'] = game.genre
    if (game.releaseYear) changes['releaseYear'] = game.releaseYear
    changes.updated_at = new Date()

    await db('games').where({ id: id }).update(changes)

    const new_game = await db('games').where({ id: id }).first()

    return new_game
  }

  static async destroy(id) {
    return await db('games').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = Game
