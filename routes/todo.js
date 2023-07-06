const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')

//Page for new todo
router.get('/new', todoController.todoNewGet);

//Send new todo
router.post('/new', todoController.todoNewPost);

//Update single todo page

//Update single todo

module.exports = router;
