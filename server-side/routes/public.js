const express = require('express')
const router = express.Router()
const SessionController = require('../controllers/session');
const Controller = require('../controllers/controller')
const Authentication = require('../middlewares/authentication')

router.post("/login", SessionController.loginPublic)
router.post("/register", SessionController.registerPublic)
router.post("/google-login", SessionController.googleLoginPublic)
router.get('/movies', Controller.readMoviesPublic)
router.get('/movies/:id', Controller.movieDetailPublic)
router.post('/qr-code', Controller.generateQrCode)

router.use(Authentication.authenticationPublic)

router.get('/favorite', Controller.readFavourite)
router.post('/favorite/:id', Controller.addFavorite)
router.delete('/favorite/:id', Controller.deletedFavorite)

module.exports = router