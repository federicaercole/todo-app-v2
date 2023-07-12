const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const utilityFunctions = require('../controllers/utilityFunctions');

//New todo page
router.get('/new', utilityFunctions.showMessage, todoController.todoNewGet);
router.post('/new', todoController.todoNewPost);

//Edit todo page
router.get('/:id/edit', utilityFunctions.showMessage, todoController.todoEditGet);
router.put('/:id/edit', todoController.todoEditPut);

//Delete todo
router.delete('/:id/delete', todoController.todoDelete);

module.exports = router;
