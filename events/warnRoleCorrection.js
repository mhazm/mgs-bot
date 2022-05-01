const client = require('../index')
const User = require('../models/User.js')
const Guild = require('../models/Guild.js')
const { e } = require('mathjs')

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const target = message.guild.members.cache.get(message.author.id)

    let user = await User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
    });

    if (!user) return;

    let guild = await Guild.findOne({
        guildID: message.guild.id,
    });

    if (!guild) return;

    // Role Warn
    const warn1Role = message.guild.roles.cache.get(guild.role.warn1);
    if (!warn1Role) return message.reply(`Warn role tidak tersedia!`).then(msg => {
        setTimeout(() => msg.delete(), 3000)
    });
    const warn2Role = message.guild.roles.cache.get(guild.role.warn2);
    if (!warn2Role) return message.reply(`Warn role tidak tersedia!`).then(msg => {
        setTimeout(() => msg.delete(), 3000)
    });
    const warn3Role = message.guild.roles.cache.get(guild.role.warn3);
    if (!warn3Role) return message.reply(`Warn role tidak tersedia!`).then(msg => {
        setTimeout(() => msg.delete(), 3000)
    });

    if (user.warn >= 2 && user.warn <= 3) {
        if (!target.roles.cache.get(warn1Role)) {
            target.roles.add(warn1Role)
        };
    } else if (user.warn >= 4 && user.warn <= 7) {
        if (!target.roles.cache.get(warn2Role)) {
            target.roles.add(warn2Role)
            target.roles.remove(warn1Role)
            target.roles.remove(warn3Role)
        }
    } else if (user.warn >= 8 ) {
        if (!target.roles.cache.get(warn3Role)) {
            target.roles.add(warn3Role)
            target.roles.remove(warn2Role)
        };
    };

    if (user.warn <= 1 && user.warn === 0) {
        target.roles.remove(warn1Role)
        target.roles.remove(warn2Role)
        target.roles.remove(warn3Role)
    }
})