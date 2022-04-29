const client = require('../index')
const User = require('../models/User.js')

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    let userData = await User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
    });

    if (!userData) {
        const account = {
            username: message.author.username,
            userId: message.author.id,
        }
        User.create({
            account,
            guildID: message.guild.id,
            userID: message.author.id,
        });
    }    
})