const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//Home page
router.get('/', indexController.getAllTodos);
router.put('/', indexController.changeTodoStatus);

//sign up page
router.get('/sign-up', indexController.userSignUpGet);

module.exports = router;