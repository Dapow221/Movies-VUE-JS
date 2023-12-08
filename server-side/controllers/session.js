const { User, Customer } = require("../models");
const { comparePass, signToken } = require("../helpers/helper");
const { OAuth2Client } = require("google-auth-library");


class SessionController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      const checkPassword = comparePass(password, user.password)
      const payload = {
        id: user.id,
      };
      const access_token = signToken(payload)

      if (!user) {
        throw { name: "email/password invalid" }
      } else if (!checkPassword) {
        throw { name: "email/password invalid" }
      }

      res.status(200).json({
        access_token: access_token,
        message: `user ${user.email} has successfully login in`,
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: "New user has been created",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    const { google_token } = req.headers
    try {
      const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: '408054119270-s8i9n0qpqr9muv4hr0g9tdujtc39d60l.apps.googleusercontent.com', 
    
        });
        const payload = ticket.getPayload()
        
        const [user, created] = await User.findOrCreate({
            where : { email: payload.email },
            defaults : {
                username : payload.name,
                password: Math.random() * 100,
                email: payload.email,
                role: 'staff',
                address: payload.locale

            }, hooks: false
        })
        const payloadForGoogle = {
            id: user.id,
            email: user.email,
        }

        const token = signToken(payloadForGoogle)
        res.status(200).json(token)
       
      } catch (error) {
        next(error)
      }
    }

    // pub for public 

    static async loginPublic(req, res, next) {
      try {
        const { email, password } = req.body
    
        const customer = await Customer.findOne({
          where: { email },
        })
        
        if (!customer) {
          throw { name: "email/password invalid" }
        } 
        const checkPassword = comparePass(password, customer.password)

        if (!checkPassword) {
          throw { name: "email/password invalid" }
        }
        
        const payload = {
          id: customer.id,
        }
        
        const access_token = signToken(payload)
  
        res.status(200).json({
          access_token: access_token,
          name: customer.username,
          message: `user ${customer.email} has successfully login in`,
        })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }

    static async registerPublic(req, res, next) {
      try {
        const { username, email, password, phoneNumber, address } = req.body
        const customer = await Customer.create({
          username,
          email,
          password,
          phoneNumber,
          address,
        })
  
        res.status(201).json({
          message: "new customer has been created",
          user: {
            id: customer.id,
            email: customer.email,
          },
        })
      } catch (error) {
        next(error)
      }
    }

    static async googleLoginPublic(req, res, next) {
      const { google_token } = req.headers
      try {
          const client = new OAuth2Client()
          const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: '408054119270-s8i9n0qpqr9muv4hr0g9tdujtc39d60l.apps.googleusercontent.com', 
          })
          const payload = ticket.getPayload()
          
          const [user, created] = await Customer.findOrCreate({
              where : { email: payload.email },
              defaults : {
                  username : payload.name,
                  password: Math.random() * 100,
                  email: payload.email,
                  address: payload.locale
  
              }, hooks: false
          })
      
          const payloadForGoogle = {
              id: user.id,
              email: user.email,
          }
  
          const token = signToken(payloadForGoogle)
          res.status(200).json(token)
         
        } catch (error) {
          next(error)
        }
      }
    
  }


module.exports = SessionController;
