const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', (req, res) => { res.send("homepage") })
router.get('/sign-up', indexController.userSignUpGet);
router.get('/sign-in', indexController.userSignInGet);
router.get("/logout", indexController.userLogout);

module.exports = router;