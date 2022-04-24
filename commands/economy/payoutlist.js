const { Client, Message, MessageEmbed } = require('discord.js');
const Convert = require('../../models/Convert');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'payoutlist',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply(`User tidak ditemukan!`);

        Convert.findOne(
            { guildID: message.guild.id, userID: user.id },
            async (err, data) => {
                if (err) throw err;
                if (data) {
                    const reqDate = moment.tz(data.tanggal, "Asia/Jakarta").format("LLLL");
                    let payoutMapped = data.convertdata.map(
                        (w, i) => 
                        `\`${i + 1}\` | Tujuan : ${w.tujuan}\nNominal : ${w.nominal}\nStatus : ${w.status || `Pending`}\nTanggal : ${reqDate}`
                    ).join('\n\n');

                    let embedN = new MessageEmbed()
                    .setTitle(`${user.username} Payout List`)
                    .setDescription(`${payoutMapped || 'Error Found!'}`)
                    .setColor("GREEN")
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `Apabila pengiriman belum diproses lebih dari 2x24 jam, harap lapor ke admin!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedN] });
                } else {
                    let embedN = new MessageEmbed()
                    .setTitle(`${user.username} Convert List`)
                    .setDescription("Kamu tidak mempunyai permintaan request convert untuk saat ini")
                    .setColor("BLUE")
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `Silahkan lakukan payout apabila saldomu telah mencukupi!`})
                    message.channel.send({ embeds: [embedN] });
                };
            }
        );
    }
}