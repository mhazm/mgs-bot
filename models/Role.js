const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    roleID: String,
    expired: Date,
    moderator: String,
})

module.exports = mongoose.model('Role', Schema)