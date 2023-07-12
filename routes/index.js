const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const utilityFunctions = require('../controllers/utilityFunctions');

//Home page
router.get('/', utilityFunctions.showMessage, indexController.getAll);
router.put('/', indexController.changeTodoStatus);

module.exports = router;
