var mongoose = require('mongoose')
passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    birth_date: String,
    address: String,
    creation_date: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)