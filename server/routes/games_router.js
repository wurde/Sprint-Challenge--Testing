'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const GamesController = require('../controllers/GamesController')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   GET,POST /games
 */

router.route('/')
  .get(GamesController.index)
  .all(require_body(['title', 'genre']))
  .post(GamesController.create)

/**
 * Export router
 */

module.exports = router
