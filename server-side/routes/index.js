const express = require('express')
const router = express.Router()
const moviesRouters = require('./movies')
const authenticateRouters = require('./session')
const genreRouters = require('./genre')
const historyRoutes = require('./history')
const publicRoutes = require('./public')
const Authentication = require('../middlewares/authentication')

router.use('/pub', publicRoutes)
router.use('/', authenticateRouters)
router.use(Authentication.authentication)
router.use('/movies', moviesRouters)
router.use('/genres', genreRouters)
router.use('/histories', historyRoutes)


module.exports = router