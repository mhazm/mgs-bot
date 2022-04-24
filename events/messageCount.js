const client = require('../index')
const User = require('../models/User.js')
const Guild = require('../models/Guild.js')


client.on('messageCreate', async (message) => {
    try {
        const member = message.author;
        if (!member) {
            return console.log('Unknown Member');
        }

        if (message.author.bot) return;
        if (!message.guild) return;

        const user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        })

        if (!user) {
            const account = {
                username: author.username,
                userId: message.author.id,
            }
            User.create({
                account,
                guildID: message.guild.id,
                userID: message.author.id,
            })
            return
        }

        user.messages++;
        user.save();

    } catch (err) {
        return console.log(err);
    }
})