const express = require('express')
const router = express.Router()
const SessionController = require('../controllers/session');

router.post("/login", SessionController.login)
router.post("/register", SessionController.register);
router.post("/google-login", SessionController.googleLogin)



module.exports = router