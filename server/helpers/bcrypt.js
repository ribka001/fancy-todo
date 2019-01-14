const bcrypt = require('bcryptjs')

module.exports = {
    encrypt: function(inputPassword) {
        const saltRounds = 10
        inputPassword = bcrypt.hashSync(inputPassword,saltRounds)
        return inputPassword
    },

    compareCrypt: function(inputPassword, dbPassword) {
        return bcrypt.compareSync(inputPassword,dbPassword)
    }
}