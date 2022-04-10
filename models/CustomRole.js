const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    roleID: String,
    createdDate: Date,
})

module.exports = mongoose.model('CustomRole', Schema)