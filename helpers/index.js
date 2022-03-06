module.exports = (req, res, next) => {

    const jwt = require('jsonwebtoken')
    const TOKEN_KEY = 'areallylongkey'
    try {
      const token = req.headers.authorization.split(' ')[1]
      const data = jwt.verify(token, TOKEN_KEY)
      // the restricted routes are now
      //expecting a json web token sent with the 
      //request from the client
      next()
    } catch (error) {
      console.log(error)
      res.status(403).send('Unauthorized')
    }
  }