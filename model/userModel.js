var mongoose = require('mongoose')

// setup schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
})

// export Borrow model
var User = module.exports = mongoose.model('user', userSchema)
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}