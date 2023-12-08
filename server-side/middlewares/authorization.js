const { Movie, Genre } = require("../models/");

class Authorization {
  static async authorization(req, res, next) {
    try {
      const { id } = req.params
      const findMovies = await Movie.findByPk(id)

      if (!findMovies) {
        throw { name: "not found movies" }
      } 

      if (req.user.role !== "admin") {
        if (req.user.id !== findMovies.authorId) {
          throw { name: "forbiden", id: req.params.id };
        }
      }

      next()
    } catch (error) {
      next(error)
    }
  }

  static async authorizationPatch(req, res, next) {
    try {
      const { id } = req.params
      const findMovies = await Movie.findByPk(id)

      if (!findMovies) {
        throw { name: "data not found"}
      }

      if (req.user.role !== "admin") {
        throw { name: "forbiden", id: req.params.id }
      }

      next()
    } catch (error) {
      next(error)
    }
  }

  static async authorizationPublic(req, res, next) {
    try {
      const { id } = req.params
      const findMovies = await Movie.findByPk(id)

      if (!findMovies) {
        throw { name: "not found movies" }
      } 

      if (!req.customer.id) {
        throw { name: "forbiden", id: req.params.id }
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Authorization;
