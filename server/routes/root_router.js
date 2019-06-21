'use strict'

/**
 * Dependencies
 */

const express = require('express')
const RootController = require('../controllers/RootController')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 */

router.route('/')
  .get(RootController.index)

/**
 * Export router
 */

module.exports = router
