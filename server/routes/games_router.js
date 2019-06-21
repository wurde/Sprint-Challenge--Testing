'use strict'

/**
 * Dependencies
 */

const express = require('express')
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
  .post(GamesController.create)

/**
 * Export router
 */

module.exports = router
