const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//New todo page
router.get('/new', todoController.todoNewGet);
router.post('/', todoController.todoNewPost);

//Edit todo page
router.get('/:id/', todoController.todoEditGet);
router.put('/:id/', todoController.todoEditPut);

//Delete todo
router.delete('/:id/', todoController.todoDelete);

module.exports = router;
