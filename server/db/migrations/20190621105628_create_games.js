'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', table => {
    table.increments('id')
    table.text('title').notNullable()
    table.text('genre').notNullable()
    table.integer('releaseYear')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
};
