const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: "test", password: bcrypt.hashSync("password", 2)},
      ]);
    });
};