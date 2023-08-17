const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//sign up and in page
router.get('/sign-up', indexController.userSignUpGet);
router.get('/sign-in', indexController.userSignInGet);

module.exports = router;