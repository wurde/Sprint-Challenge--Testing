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

    const new_game = await db('games').where({ id: id })

    return new_game
  }
}

/**
 * Export model
 */

module.exports = Game
