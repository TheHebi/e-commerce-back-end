const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const category = await Category.findAll({
      include: {model:Product, attributes: {exclude: [`createdAt`,`updatedAt`]}},
      attributes: {exclude: [`createdAt`,`updatedAt`]}
    })
    res.status(200).json(category)
  }catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const category = await Category.findOne({
      where: {id:req.params.id},
      include: {model:Product, attributes: {exclude: [`createdAt`,`updatedAt`]}},
      attributes: {exclude: [`createdAt`,`updatedAt`]}
    })
    res.status(200).json({message:category ? res.json(category): `Category not found.`})
  }catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  }catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const editCategory = await Category.update(req.body,{
      where: {id:req.params.id},
    })
    console.log(editCategory)
    res.status(200).json({message:editCategory[0] ? `Category updated!`: `Category not found.`})
  }catch(err){
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const delCategory = await Category.destroy({
      where:{id:req.params.id}
    });
    console.log(delCategory)
    res.status(200).json({message:delCategory ? `Category deleted!`: `Category not found.`})
  }catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;
