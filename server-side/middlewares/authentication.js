const { verifyToken } = require("../helpers/helper");
const { User, Customer } = require("../models/");

class Authentication {
  static async authentication(req, res, next) {
    try {
      // mengecek apakah access token ada apa engga
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "invalid token" };
      }
      // decode payload
      const payload = verifyToken(access_token);

      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "data not found" };
      }

      //passing data
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (error) {
      next(error)
    }
  }

  static async authenticationPublic(req, res, next) {
    try {

      const { access_token } = req.headers

      if (!access_token) {
        throw { name: "invalid token" }
      }
     
      const payload = verifyToken(access_token)
      
      const customer = await Customer.findByPk(payload.id)

      if (!customer) {
        throw { name: "data not found" }
      }

      req.customer = {
        id: customer.id,
        email: customer.email,
  
      }
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports =  Authentication
