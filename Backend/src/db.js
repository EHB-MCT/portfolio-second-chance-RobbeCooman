const knex = require('knex');

const dbConfig = {
  client: 'pg', 
  connection: {
    host: 'localhost', 
    user: 'postgres', 
    password: 'robbe', 
    database: 'dev5', 
  },
};

const db = knex(dbConfig);

module.exports = db;
