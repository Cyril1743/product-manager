const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
    include: Product
  }
  ).then((data) => res.status(200).json(data)).catch((err) => res.status(400).json(err))

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    include: Product
  }).then((data) => res.status(200).json(data)).catch((err) => res.status(400).json(err))
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create({category_name: req.body.name}).then(() => res.status(201).json("Created!")).catch((err) => res.status(400).json(err))
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update({
    category_name: req.body.name
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => res.status(200).json("Updated")).catch((err) => res.status(400).json(err))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.status(200).json()).catch((err) => res.status(400).json(err))
});

module.exports = router;
