const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require('../../models/Guild');

module.exports = {
    name: 'disable',
    description: 'Melakukan penonaktifan untuk feature',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });
        }
                    
        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        if (!guild) return;

        const value = false;

        let opt = args[0].toLowerCase();
        if (!opt) {
            return message.reply(`Tolong isikan opsi yang ingin di disable!`);
        }
        // Start
        try {
            if (opt === 'welcome') {
                if (guild.active.welcome ===  false) {
                    return message.reply(`Saat ini welcome-system sudah tidak aktif.`);
                }
    
                guild.active.welcome = value;
                guild.save()
                let embedN = new MessageEmbed()
                .setDescription('Feature `welcome` sukses di non-aktifkan!')
                .setColor('GREEN')
                .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat detail seluruh config guild!`})
                .setTimestamp()
                message.channel.send({ embeds: [embedN] });
            } else if (opt === "bye") {
                if (guild.active.bye ===  false) {
                    return message.reply(`Saat ini bye-system sudah tidak aktif.`);
                }
    
                guild.active.bye = value;
                guild.save()
                let embedN = new MessageEmbed()
                .setDescription('Feature `bye` sukses di non-aktifkan!')
                .setColor('GREEN')
                .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat detail seluruh config guild!`})
                .setTimestamp()
                message.channel.send({ embeds: [embedN] });
            } else if (opt === "apply") {
                if (guild.active.apply ===  false) {
                    return message.reply(`Saat ini apply-system sudah tidak aktif.`);
                }
    
                guild.active.apply = value;
                guild.save()
                let embedN = new MessageEmbed()
                .setDescription('Feature `apply` sukses di non-aktifkan!')
                .setColor('GREEN')
                .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat detail seluruh config guild!`})
                .setTimestamp()
                message.channel.send({ embeds: [embedN] });
            } else if (opt === "payout") {
                if (guild.active.convert ===  false) {
                    return message.reply(`Saat ini payout-system sudah tidak aktif.`);
                }
    
                guild.active.convert = value;
                guild.save()
                let embedN = new MessageEmbed()
                .setDescription('Feature `payout` sukses di non-aktifkan!')
                .setColor('GREEN')
                .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat detail seluruh config guild!`})
                .setTimestamp()
                message.channel.send({ embeds: [embedN] });
            } else if (opt === "give") {
                if (guild.active.give ===  false) {
                    return message.reply(`Saat ini give-system sudah tidak aktif.`);
                }
    
                guild.active.give = value;
                guild.save()
                let embedN = new MessageEmbed()
                .setDescription('Feature `give` sukses di non-aktifkan!')
                .setColor('GREEN')
                .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat detail seluruh config guild!`})
                .setTimestamp()
                message.channel.send({ embeds: [embedN] });
            }
        } catch(err) {
            message.reply(`Error Found! Pls contact owner!`);
            return console.log(err);
        }
    }
}