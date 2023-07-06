const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

//New category page
router.get('/new', categoryController.categoryNewGet);
router.post('/new', categoryController.categoryNewPost);

//Edit category

//Delete

//Filter todos by categories
router.get('/:category', categoryController.todosByCategoryGet);

module.exports = router;
