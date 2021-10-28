const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  let result = await Product.findAll({
    include: [{ model: Category }, { model: Tag }]
  });

  res.json(result);
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  let result = await Product.findOne({
    where: { id: req.params.id },
    include: [{ model: Category }, { model: Tag }]
  });

  res.json(result);
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      productName: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
    */

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => {
          return {
            productId: product.id,
            tagId,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    }
  });

  //create new product tag objects
  let newProductTags = [];

  req.body.tagIds.forEach(element => {
    newProductTags.push({
      productId: req.params.id,
      tagId: element
    });
  });
  
  await ProductTag.destroy({ where: { productId: req.params.id } })
  await ProductTag.bulkCreate(newProductTags)

  let result = await Product.findOne({
    where: { id: req.params.id },
    include: [{ model: Category }, { model: Tag }]
  });

  res.json(result);
})

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  let numberDestroyed = await Product.destroy({
    where: { id: req.params.id }
  });

  if (numberDestroyed) {
    res.send(`Product ${req.params.id} deleted`);
  } else {
    res.send('Could not find product with that ID');
  }
});

module.exports = router;
