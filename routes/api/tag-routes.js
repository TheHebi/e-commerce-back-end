const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findAll({
      include: {model:Product, attributes: {exclude: [`createdAt`,`updatedAt`]}, 
      through:{attributes: {exclude: [`createdAt`,`updatedAt`]}}},
      attributes: {exclude: [`createdAt`,`updatedAt`]}
      
    })
    res.status(200).json(tag)
  }catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findOne({
      where: {id:req.params.id},
      include: {model:Product, attributes: {exclude: [`createdAt`,`updatedAt`]}},
      through:{attributes: {exclude: [`createdAt`,`updatedAt`]}},
      attributes: {exclude: [`createdAt`,`updatedAt`]}
    })
    res.status(200).json({message:tag ? res.json(tag): `Tag not found.`})
  }catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  }catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const editTag = await Tag.update(req.body,{
      where: {id:req.params.id},
    })
    res.status(200).json({message:editTag[0] ? `Tag updated`: `Tag not found.`})
  }catch(err){
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const delTag = await Tag.destroy({
      where:{id:req.params.id}
    });
    res.status(200).json({message:delTag ? `Tag deleted!`: `Tag not found.`})
  }catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;
