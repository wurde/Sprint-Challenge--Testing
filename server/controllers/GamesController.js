'use strict'

/**
 * Dependencies
 */

const Game = require('../models/Game')

/**
 * Define controller
 */

class GamesController {
  static async find_or_404(req, res, next) {
    try {
      const game = await Game.find({ id: req.params.id })

      if (game) {
        next()
      } else {
        res.status(404).json({ error: { message: 'Game not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async index(req, res) {
    try {
      const games = await Game.all()

      res.status(200).json(games)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const is_title_unique = await Game.title_uniqueness_check(req.body.title)

      if (is_title_unique) {
        const game = await Game.create(req.body)

        res.status(201).json(game)
      } else {
        res.status(405).json({ error: { message: 'Not Allowed: Game already exists with that title' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const game = await Game.find({ id: req.params.id })

      res.status(200).json(game)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const game = await Game.update(req.params.id, req.body)

      res.status(200).json(game)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      await Game.destroy(req.params.id)

      res.status(200).json()
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
