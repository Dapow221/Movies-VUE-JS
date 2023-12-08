const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const Authorization = require('../middlewares/authorization')

router.get('/', Controller.getMovies)
router.post('/', Controller.addMovies)
router.patch('/:id', Authorization.authorizationPatch, Controller.patchMovies)
router.put('/:id', Authorization.authorization, Controller.putMovies)
router.delete('/:id', Authorization.authorization, Controller.deletedMovies)
router.get('/:id', Controller.getMoviesById)


module.exports = router