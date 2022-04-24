const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require('../../models/Guild');

module.exports = {
    name: 'setbudget',
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

            let guild = await Guild.findOne({
                guildID: message.guild.id
            });

            if (!guild) return;

            const budget = args[1];
            if (isNaN(budget)) {
                return message.reply('Kamu harus memasukan digit angka!');
            }
            if (budget < 1) {
                return message.reply('Kamu harus memasukan angka lebih dari 1.');
            }

            const modlog = client.channels.cache.get(guild.channel.modlog)

            if (args[0].toLowerCase() === 'add' || 'tambah') {
                let notif = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Budget server telah ditambahkan Rp.${budget}\nSaat ini budget payout sebesar Rp.${guild.budget}`)
                    .setTimestamp()
                    .setFooter({text: `Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                modlog.send({ embeds: [notif] });

                guild.budget += budget;
                guild.save();
                message.channel.send(`Budget telah berhasil ditambahkan senilai Rp.${budget}`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            } else if (args[0].toLowerCase() === 'remove') {
                if (guild.budget < budget) {
                    return message.reply('Budget servernya udah ga ada, masih aja mau dikurangin..')
                }

                let notif = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Budget server telah dikurangkan Rp.${budget}\nSaat ini budget payout sebesar Rp.${guild.budget}`)
                    .setTimestamp()
                    .setFooter({text: `Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                modlog.send({ embeds: [notif] });

                guild.budget -= budget;
                guild.save();
                message.channel.send(`Budget telah berhasil dikurangkan senilai Rp.${budget}`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            } else if (args[0].toLowerCase() === 'reset') {
                let notif = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Budget server telah direset\nReset by ${message.author.username}`)
                    .setTimestamp()
                    .setFooter({text: `Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                modlog.send({ embeds: [notif] });

                guild.budget = 0;
                guild.save();
                message.channel.send(`Budget telah direset menjadi 0.`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            }
        } catch {
            return console.log(err);
        }

    }
}