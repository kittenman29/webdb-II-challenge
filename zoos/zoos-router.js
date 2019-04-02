const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  });
  

module.exports = router;