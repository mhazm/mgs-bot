const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const User = require('../../models/User.js');

module.exports = {
    name: 'create-profile',
    description: 'Force create profile for user',
    usage: '<member>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!target) return message.reply('Please mention member first! Ba-baka!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

            let user = await User.findOne({
                guildID: message.guild.id,
                userID: target.user.id,
            });

            if (!user) {
                const account = {
                    username: target.user.username,
                    userId: target.user.id,
                }
                User.create({
                    account,
                    guildID: message.guild.id,
                    userID: target.user.id,
                })
                return message.channel.send(`Profile berhasil dibuat untuk ${target.user.username}`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                  });
            }
        } catch(error) {
            return console.log(error);
        };
    },
};