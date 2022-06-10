const jwtUtils = require("../utils/jwt.utils")

const setCurrentUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const authenticationToken = authHeader && authHeader.split(" ")[1].trim()

  if(!authenticationToken) return next()
  const {decoded, expired} = jwtUtils.verifyJwt(authenticationToken)
  if(decoded) {    
    res.locals.user = decoded
    return next()
  }
  next()
}

module.exports = setCurrentUser