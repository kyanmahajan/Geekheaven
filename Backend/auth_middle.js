const User = require('./schema.js')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
  
  const authHeader = req.headers.authorization
 
  const token = authHeader.split(' ')[1]
  console.log(token)
  

  try {
    const payload = jwt.verify(token, process.env.JWT_secret)

    console.log(payload)
    req.user = { userId: payload.id, name: payload.name}
    console.log(req.user)
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = auth