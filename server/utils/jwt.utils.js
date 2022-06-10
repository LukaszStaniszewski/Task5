const jwt = require('jsonwebtoken')

const privateKey = process.env.JSON_TOKEN_PRIVATE_KEY
console.log(privateKey)
exports.signJwt = (payload, options) => {
  options = options || '1m'

  return jwt.sign(payload.toJSON(), privateKey, { expiresIn: options})
}

exports.verifyJwt = (token) => {

  try{
    const decoded = jwt.verify(token, privateKey)
    return {
      expired: false,
      decoded,
    }
        
  }catch(error){ 
    console.error(error);
   return {
     expired: true,
     decoded: null,
     message: error.message === "jwt-expired",
   }
         
  }
}