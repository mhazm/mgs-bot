const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    date: Date,
    amount: String,
    thr: Boolean,
})

module.exports = mongoose.model('Thr', Schema)