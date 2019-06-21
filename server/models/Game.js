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
}

/**
 * Export model
 */

module.exports = Game
