const { Movie, Genre, User, History, Favorite, Customer } = require("../models/");
const axios = require('axios')

class Controller {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [ Genre, User ]
      })

      res.status(200).json(movies);
    } catch (error) {
      next(error)
    }
  }

  static async addMovies(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const movies = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: req.user.id
      })

      await History.create({
        title: title,
        description: `movies with id ${movies.id} created`,
        updatedBy: req.user.email
      })

      res.status(201).json(movies);
    } catch (error) {
      next(error)
    }
  }

  static async deletedMovies(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await Movie.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `done delete movies from id ${id} `,
      });
    } catch (error) {
      next(error)
    }
  }

  static async getMoviesById(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await Movie.findByPk(id);

      if (!movies) {
        throw { name: "not found movies" };
      }

      res.status(200).json(movies);
    } catch (error) {
      next(error)
    }
  }

  static async readAllMovies(req, res, next) {
    try {
      const genre = await Genre.findAll();

      res.status(200).json(genre);
    } catch (error) {
      next(error)
    }
  }

  static async putMovies(req, res, next) {
    try {
      const { id } = req.params;
      const putMovies = await Movie.findByPk(id)

      if (!putMovies) {
        throw { name: "data not found"}
      }

      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body
      const updateMovies = await Movie.update({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId

      }, { where: { id } })

      if (!updateMovies) {
        throw { name: "cannot update movies" }
      }
      res.status(201).json({
        message: `done updated movies from id ${id}`
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async patchMovies(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body 
  
      const findMovies = await Movie.findByPk(id)

      if (findMovies.status === status) {
        throw { name: "status is same", status }
      } else if (!findMovies) {
        throw { name: "data not found" }
      }

      const patchedMovies = await Movie.update({ status }, { where: { id } })

      const createdHistory = await History.create({
        title: findMovies.title,
        description: `movies with id ${id} status has been updated from ${findMovies.status} into ${status}`,
        updatedBy: req.user.email
      })

      if (patchedMovies[0] === 0) {
        throw { name: "data not found" }
      } else if (!createdHistory) {
        throw { name: "cannot created history"}
      }

      res.status(201).json({
        message: `movies with id ${id} status has been updated to ${status}`
      })

    } catch (error) {
      next(error)
    }
  }

  static async getHistory(req, res, next) {
    try {
      const history = await History.findAll({
        order: [
          ['id', 'DESC']
        ]
      })

      res.status(200).json(history)
    } catch (error) {
      next(error)
    }
  }

  // for pub public

  static async readMoviesPublic(req, res, next) {
    try {
     
      const { filter, page = 1 } = req.query
      
      let limit = 8

      const option = {
        limit : limit,
        offset : limit * ( page - 1 ),
        include: [ Genre ],
        order: [['id', 'ASC']],
        where: { status : 'active'}
      }

      if(filter) {
        option.where.genreId = filter
      }
      
      const movies = await Movie.findAndCountAll(option)


      res.status(200).json({
        message: "succes to read all data",
        totalPages : Math.ceil( movies.count / limit),
        content : movies.rows,
      })
      
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  
  static async movieDetailPublic(req, res, next) {
    try {
      const { id } = req.params
      const movies = await Movie.findByPk(id)

      if (movies) {
        res.status(200).json({
          message: "success read data",
          movies,
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  
  static async readFavourite(req, res, next) {
    try {
      const customerId = req.customer.id
      const favorite = await Favorite.findAll({
        include: Movie,
        where: { customerId }
      })
      res.status(200).json({
        message: "success to read favorite data",
        favorite
      })

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  
  static async addFavorite(req, res, next) {
    try {
      const { id, email } = req.customer
      const movieId = +req.params.id

      const addedFav = await Favorite.create({
        customerId : id,
        movieId : movieId
      })

      res.status(201).json({
        message: "favorite has been added"
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async deletedFavorite(req, res, next) {
    try {
      const { id } = req.params
      await Favorite.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `done delete favorite `,
      })
    } catch (error) {
      next(error)
    }
  }

  static async generateQrCode(req, res, next) {
    try {
      const { url } = req.body
      const { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create?access-token=lHGTDREa2XExIbRy9-5ygZcT6sq5ifJ1X2cE40OhcDnIj1vxg9Yy6P7_5Yu46IF3",
        method: "post",
        data: {
          "frame_name": "no-frame",
          "qr_code_text": `${url}`,
          "image_format": "SVG",
          "qr_code_logo": "scan-me-square"
        }
      })
      res.status(200).json({data})
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = Controller;
