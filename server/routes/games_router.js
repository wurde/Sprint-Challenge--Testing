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
 *   GET /games
 */

router.route('/')
  .get(GamesController.index)

/**
 * Export router
 */

module.exports = router
