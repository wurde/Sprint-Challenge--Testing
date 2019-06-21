'use strict'

/**
 * Dependencies
 */

const Game = require('../models/Game')

/**
 * Define controller
 */

class GamesController {
  static async index(req, res) {
    try {
      const games = await Game.all()

      res.status(200).json(games)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }
}

/**
 * Export controller
 */

module.exports = GamesController
