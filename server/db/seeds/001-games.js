'use strict'

exports.seed = function(knex, Promise) {
  return knex('games').del()
    .then(function () {
      return knex('games').insert([
        {id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {id: 2, title: 'Super Mario Bros', genre: 'Platform', releaseYear: 1985},
        {id: 3, title: 'The Legend of Zelda', genre: 'Action-adventure', releaseYear: 1986},
      ])
    })
}
