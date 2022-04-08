const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const db = require('../../models/Warn.js');
const User = require('../../models/User.js');
const Guild = require('../../models/Guild.js');

module.exports = {
    name: 'remove-warn',
    description: 'Menghapus satu warn dari member',
    usage: '<member> <nomer warn>',
    aliases: ['rw'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Member tidak ditemukan! Mau ngapus apa?').then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

            // Target User DB
            let target = await User.findOne({
                guildID: message.guild.id,
                userID: user.user.id,
            });

            // Guild DB
            let data = await Guild.findOne({
                guildID: message.guild.id
            });

            const modlog = client.channels.cache.get(data.channel.modlog);
            if (!modlog) {
                return message.reply(
                    `Please setup this bot first or setting modlog channel with ${data.prefix}setch modlog\nSee all command on ${data.prefix}help`
                    ).then(msg => {
                        setTimeout(() => msg.delete(), 3000)
                    });
            };

            if (!target) return bot.nodb(member.user);
            db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
                if(err) throw err;
                if(data) {
                    let number = parseInt(args[1]) - 1
                    data.content.splice(number, 1)
                    message.channel.send('deleted the warn').then(msg => {
                        setTimeout(() => msg.delete(), 3000)
                      });
                    data.save()

                    let embed = new MessageEmbed()
                        .setTitle(`Remove Warn | ${user.user.username}`)
                        .setColor(client.config.berhasil)
                        .addField("Target", user.user.username, true)
                        .addField("Moderator", message.author.username, true)
                        .setTimestamp()
                    modlog.send({ embeds: [embed] });
                } else {
                    message.channel.send('Member ini bersih dari warn..').then(msg => {
                        setTimeout(() => msg.delete(), 3000)
                      });
                }
            })
            target.warn -= Math.floor(parseInt(1));
            target.save();
        } catch (error) {
            return console.log(error);
        };
    },
};