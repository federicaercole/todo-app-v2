const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

//New category page
router.get('/new', categoryController.categoryNewGet);
router.post('/new', categoryController.categoryNewPost);

//Filter todos by categories
router.get('/:category', categoryController.todosByCategoryGet);

//Delete
router.delete('/:category/delete', categoryController.categoryDelete);

//Edit
router.put('/:category/edit', categoryController.categoryPut);

module.exports = router;
