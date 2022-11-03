const jwt = require('jsonwebtoken')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })
User = require('../model/userModel')


exports.index = function (req, res) {
    res.send("Welcome to user page!")
}

exports.signup = function (req, res) {
    //console.log("Sign up request=", req)

    var userRole
    if (req.body.role == "NORMAL") {
        userRole = process.env.NORMAL_ENCODING
    } else if (req.body.role == "ADMIN") {
        userRole = process.env.ADMIN_ENCODING
    } else {
        res.status(400).send("Error: Invalid role.")
    }
    var user = new User({
        username: req.body.username,
        role: userRole
    })
    user.save((err) => {
        if (err) {
            res.json(err)
        } else {
            res.json({
                message: "New user created!",
                data: user
            })
        }
    })
}

exports.login = function (req, res) {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            res.json(err)
        } else {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                process.env.TOKEN_KEY
            )
            res.json({
                message: "Login success!",
                data: user,
                token: token
            })
        }
    })
}

// for accessing of pages
exports.normalAccess = function (req, res) {
    //console.log("Normal access request=", req)
    if (req.role == process.env.NORMAL_ENCODING 
        || req.role == process.env.ADMIN_ENCODING) {
        res.json({
            message: `Hi ${req.username}, welcome to User Information page!`
        })
    } else {
        res.status(403).send("Authorization Error: You are not allowed to access this page.")
    }
}

exports.adminAccess = function (req, res) {
    //console.log("Admin access request=", req)
    if (req.role == process.env.ADMIN_ENCODING) {
        res.json({
            message: `Hi ${req.username}, welcome to Admin Information page!`
        })
    } else {
        res.status(403).send("Authorization Error: You are not allowed to access this page.")
    }
}

exports.delete = function (req, res) {
    User.deleteMany({}, (err, record) => {
        if (err) {
            res.send(err)
        } else {
            res.json(record)
        }
    })
}