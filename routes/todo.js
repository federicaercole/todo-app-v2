const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const categoryRouter = require('../routes/category');

router.get('/all', todoController.getAllTodos);
router.put('/', todoController.changeTodoStatus);

router.use('/category', categoryRouter);

//New todo page
router.get('/new', todoController.todoNewGet);
router.post('/', todoController.todoNewPost);

//Edit todo page
router.get('/:id', todoController.todoEditGet);
router.put('/:id', todoController.todoEditPut);

//Delete todo
router.delete('/:id', todoController.todoDelete);

module.exports = router;
