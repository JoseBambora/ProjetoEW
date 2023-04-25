var mongoose = require('mongoose'),
Schema = mongoose.Schema
passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    username: String,
    password: String,
    email: String,
    birth_date: String,
    address: String,
    creation_date: String
})

User.plugin(passportLocalMongoose)
module.exports = mongoose.model('user', User)