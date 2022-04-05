const client = require('../index')
const User = require('../models/User.js')
const Guild = require('../models/Guild.js')
const { MessageEmbed } = require('discord.js')

client.on('messageCreate', async (message) => {
    const { author } = message

    if (message.author.bot) return;
    if (!message.guild) return;

    let user = await User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
    })
    let guild = await Guild.findOne({ guildID: message.guild.id })
    if (!guild) {
        const newGuild = new Guild({
            guildID: message.guild.id,
            guildName: message.guild.name,
        })
        newGuild.save()
        return
    }
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

    if (!message.content.toLowerCase().startsWith(guild.prefix)) return;

    const [cmd, ...args] = message.content
        .slice(guild.prefix.length)
        .trim()
        .split(/ +/g)

    const command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()))

    if (!command) return

    // Blacklist usecommand
    if (user.blacklist == 'true') {
        const embed = new MessageEmbed()
            .setColor(client.config.colorEmbed)
            .setTitle('[⚠️] Warning!')
            .setDescription(
                'Kamu tidak dapat menggunakan command dikarenakan kamu telah di blacklist!\nHarap hubungi Administrator untuk membuka kembali blacklist anda.'
            )

        return channel
            .send({ embeds: [embed] })
            .then((d) => d.delete({ timeout: 10000 }))
    }

    await command.run(client, message, args)
})
