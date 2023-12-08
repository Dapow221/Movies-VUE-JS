'use strict';
const { Model } = require('sequelize');
const { hashPass } = require('../helpers/helper');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Favorite, {
        foreignKey: "customerId"
      })
    }
  }
  Customer.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already exist'
      },
      validate: {
        notNull: {
          msg: 'Email required'
        },
        notEmpty: {
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password required'
        },
        notEmpty: {
          msg: 'Password required'
        },
        len: {
          args: [5], 
          msg: 'Password must be at least 5 characters long'
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (customer) => {
        const hash = hashPass(customer.password)
        customer.password = hash
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};