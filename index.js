let express = require('express')
let apiRoutes = require('./routes/api-routes')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

let app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});
var db = mongoose.connection
if(!db)
    console.log("Error connecting db")
else
    console.log(`DB connected successfully under env=${process.env.NODE_ENV}`)

var port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Home page of OTOT-C'))
app.use('/user', apiRoutes)
app.listen(port, () => {
    console.log("Running on port " + port)
})

//const jwt = require('jsonwebtoken')

// const token = jwt.sign(
//     { username: "Xuanqi", role: "1234" },
//     process.env.TOKEN_KEY
// )
// const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njc0ODkxMjB9.bkVAeLVt_6m-6z3lCNO-7SQ1BysIqYYByuSl4OWO2Sg", process.env.TOKEN_KEY)
// console.log(decoded)