const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  verification: (token, cb) => {
    jwt.verify(token, process.env.SECRET_JWT, cb)
  },

  getToken: (id, email) => {
    let token = jwt.sign({ id: id, email: email }, process.env.SECRET_JWT);
    return token
  }
}