const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let result = await Category.findAll({
    include: [{ model:Product}]
  })

  res.json(result)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let result = await Category.findOne({
    where: {id: req.params.id},
    include: [{model:Product}]
  })
  res.json(result)
});

router.post('/', async (req, res) => {
  // create a new category
  let result = await Category.create(req.body)
  res.json(result)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  let [result] = await Category.update(req.body, {
    where: {id: req.params.id}
  })

  res.send(`${result} Categories updated`)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  let numberDestroyed = await Category.destroy({
    where: {id: req.params.id}
  })

  if (numberDestroyed) {
    res.send(`Category ${req.params.id} deleted.`)
  } else {
    res.send('Could not find tag with that ID')
  }
});

module.exports = router;
