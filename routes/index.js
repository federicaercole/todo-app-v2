const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//Home page
router.get('/', indexController.getAllTodos);
router.put('/', indexController.changeTodoStatus);

//sign up and in page
router.get('/sign-up', indexController.userSignUpGet);
router.get('/sign-in', indexController.userSignInGet);

module.exports = router;