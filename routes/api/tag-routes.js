const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    include: [{ model: Product }]
  }).then((data) => res.status(200).json(data)).catch((err) => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findByPk(req.params.id, {
    include: [{ model: Product }]
  }).then((data) => res.status(200).json(data)).catch((err) => res.status(400).json(err))
});

router.post('/', async (req, res) => {
  // create a new tag
await Tag.create({
  tag_name: req.body.tag_name
}).then(() => res.status(201).json("Created")).catch((err) => res.status(400).json(err))
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => res.status(200).json("Updated")).catch((err) => res.status(400).json(err))

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.status(200).json("Deleted")).catch((err) => res.status(400).json(err))

});

module.exports = router;
