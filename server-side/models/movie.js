'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId'
      })
      Movie.hasMany(models.Favorite, {
        foreignKey: 'movieId'
      })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title required'
        },
        notEmpty: {
          msg: 'Title required'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Synopsis required'
        },
        notEmpty: {
          msg: 'Synopsis required'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: 'Rating must be at least 1'
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (movies) => {
       movies.status = 'active'
      }
    },
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};