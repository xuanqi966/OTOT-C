const jwt = require('jsonwebtoken')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send("Authentication Error: No token provided")
    }

    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.username = decoded.username
        req.role = decoded.role
        console.log(decoded)
    } catch (err) {
        console.log(err)
        return res.status(401).send("Authentication Error: Invalid Token")
    }
    return next()
}

module.exports = verifyToken