const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const db = require('../../models/Warn.js');

module.exports = {
    name: 'warns',
    description: 'Melihat daftar warning member',
    usage: '<member>',
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
            if (!user) return message.reply('Member tidak ditemukan! Mau liat apa?').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    let mappedData = data.content.map(
                        (w, i) => 
                        `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                    ).join('\n');

                    let embed = new MessageEmbed()
                        .setTitle(`${user.user.username} warns`)
                        .setDescription(`${mappedData}`)
                        .setColor("RANDOM")
                        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                    message.channel.send({ embeds: [embed] });
                } else {
                    let e = new MessageEmbed()
                    .setTitle(`${user.user.username} warns`)
                    .setDescription('Tidak ada warn')
                    .setColor(client.config.berhasil)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    message.channel.send({ embeds: [e] })
                }
            })
        } catch(error) {
            return console.log(error);
        };
    },
};