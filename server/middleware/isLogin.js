const jwt = require('../helpers/jwt')

module.exports = {
    isLogin: function(req, res, next) {
        jwt.verification(req.headers.token, function(err, decoded) {
            if(err) {
                res.status(400).json({message: 'You are not login. Please login first'})
            } else {
                User.findOne({
                    email: decoded.email
                })
                    .then(user => {
                        req.decoded = decoded
                        next()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }
}