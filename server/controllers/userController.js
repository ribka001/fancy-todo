const User = require('../models/User')
const {compareCrypt} = require('../helpers/bcrypt')
const {getToken} = require('../helpers/jwt')
const axios = require('axios')

class UserController {
    static register(req, res) {
        let user = new User({
            email: req.body.email,
            password: req.body.password,
            loginSource: "manual form"
        })
        user.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                res.status(400).json({message: "user not found, please register first"})
            } else {
                if(user.loginSource != "manual form") {
                    res.status(400).json({message: `previously you register with ${user.loginSource}, please login with ${user.loginSource}`})
                }else{
                    if (compareCrypt(req.body.password, user.password)){
                        let token = getToken(user._id, user.email);
                        res.status(200).json(token)
                    } else {
                        res.status(400).json({message: "email or password is incorrect"})
                    }                
                }
            }
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static loginGoogle(req, res) {
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.google_access_token}`
        })
        .then(({ data }) => {
            User.findOne({
                email: data.email
            })
            .then((user) => {                        
                if (!user) {
                    let user = new User({
                        email: response.data.email,
                        loginSource: "google"
                    })
                    user.save()
                    .then(result => {
                        let token = getToken(result._id, result.email);
                        res.status(200).json(token)
                    })
                    .catch(err => {
                        res.status(400).json(err.message)
                    })        
                }else {
                    if(user.loginSource != "google") {
                        res.status(400).json({message: `previously you register ${user.loginSource}, please login with ${user.loginSource}`})
                    } else {                                
                        let token = getToken( user._id, user.email);
                        res.status(200).json(token)            
                    }
                }
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
        })
        .catch(function (err) {
            res.status(500).json(err.message)
        });
    }
}

module.exports = UserController