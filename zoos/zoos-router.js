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

router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(ids => {
        const[id] = ids
        db('zoos')
        .where({id})
        .first()
        .then(zoos => {
            res.status(200).json(zoos)
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.get('/:id', (req, res) => {
    const {id} = req.params
    db('zoos')
    .where({id})
    .first()
    .then(zoo => {
        if(zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({message: "Zoo animal not found"})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.put('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if(count>0) {
                db('zoos')
                .where({id: req.params.id})
                .first()
                .then(zoo => {
                    res.status(200).json(zoo)
                })
            } else {
                res.status(404).json({error: 'Zoo animal not found for update'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    db('zoos')
    .where({id})
    .del()
    .then(count => {
      if(count>0) {
        res.status(204).end()
      } else {
        res.status(404).json({error: 'Could not delete animal by id, please check id entered'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
  });

router.delete('/:id', (req, res) => {
    const {id} = req.params
})


  

module.exports = router;