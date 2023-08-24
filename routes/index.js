const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { signIn } = require('../controllers/userController');

router.get('/', indexController.getHome);
router.get('/sign-up', indexController.userSignUpGet);
router.get('/sign-in', indexController.userSignInGet);
router.get("/logout", indexController.userLogout);
router.get('/demo', indexController.demoUserSignIn, signIn);

module.exports = router;