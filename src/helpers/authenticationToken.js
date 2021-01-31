const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]

  if (!accessToken) {
    const error = new createError(401, 'Forbidden: Token cannot be empty')
    return next(error)
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (error, results) => {
    if(!error){
      req.user = results
      return next()
    }
    if (error.name === 'TokenExpiredError') {
      const error = new createError(401, 'Access Token expired')
      return next(error)
    } else if (error.name === 'JsonWebTokenError') {
      const error = new createError(401, 'Invalid Token')
      return next(error)
    }
  })
}

module.exports = authenticationToken