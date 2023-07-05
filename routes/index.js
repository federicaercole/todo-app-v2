const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//Home page
router.get('/', indexController.getAll);

module.exports = router;
