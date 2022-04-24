const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require('../../models/Guild');

module.exports = {
    name: 'enable',
    description: 'Mengaktifkan Feature bot',
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

        const value = true;

        let opt = args[0].toLowerCase();
        if (!opt) {
            return message.reply(`Tolong isikan opsi yang ingin di disable!`);
        }
        try {
            if (opt === 'welcome') {
                if (!guild.channel.welcome) {
                    let embedF = new MessageEmbed()
                        .setDescription(`Tolong setting welcome channelnya terlebih dahulu dengan command ${guild.prefix}setch welcome <tag channel>`)
                        .setColor("RED")
                    message.channel.send({ embeds: [embedF] }).then(msg => {
                        setTimeout(() => msg.delete(), 6000)
                    });
                }
    
                if (guild.active.welcome === true) {
                    return message.reply(`Saat ini welcome-system sudah berjalan di channel  <#${guild.channel.welcome}>`).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                }
    
                // Proses
                guild.active.welcome = value;
                guild.save().then(() => {
                    let embedS = new MessageEmbed()
                    .setDescription('Feature welcome-system telah berhasil diaktifkan!')
                    .setColor("GREEN")
                    .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat semua pengaturan di guild!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedS] });
                });
                
            } else if (opt === 'bye') {
                if (!guild.channel.bye) {
                    let embedF = new MessageEmbed()
                        .setDescription(`Tolong setting bye channelnya terlebih dahulu dengan command ${guild.prefix}setch bye <tag channel>`)
                        .setColor("RED")
                    message.channel.send({ embeds: [embedF] }).then(msg => {
                        setTimeout(() => msg.delete(), 6000)
                    });
                }
    
                if (guild.active.welcome === true) {
                    return message.reply(`Saat ini bye-system sudah berjalan di channel  <#${guild.channel.bye}>`).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                }
    
                // Proses
                guild.active.bye = value;
                guild.save().then(() => {
                    let embedS = new MessageEmbed()
                    .setDescription('Feature bye-system telah berhasil diaktifkan!')
                    .setColor("GREEN")
                    .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat semua pengaturan di guild!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedS] });
                });
                
            } else if (opt === 'apply') {
                if (guild.active.apply === true) {
                    return message.reply(`Saat ini apply-system sudah berjalan!`).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                }
    
                // Proses
                guild.active.apply = value;
                guild.save().then(() => {
                    let embedS = new MessageEmbed()
                    .setDescription('Feature apply-system telah berhasil diaktifkan!')
                    .setColor("GREEN")
                    .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat semua pengaturan di guild!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedS] });
                });
            
            } else if (opt === 'payout') {
                if (guild.active.convert === true) {
                    return message.reply(`Saat ini payout-system sudah berjalan!`).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                }
    
                // Proses
                guild.active.convert = value;
                guild.save().then(() => {
                    let embedS = new MessageEmbed()
                    .setDescription('Feature payout-system telah berhasil diaktifkan!')
                    .setColor("GREEN")
                    .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat semua pengaturan di guild!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedS] });
                });
            
            } else if (opt === 'give') {
                if (guild.active.give === true) {
                    return message.reply(`Saat ini give-system sudah berjalan!`).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                }
    
                // Proses
                guild.active.give = value;
                guild.save().then(() => {
                    let embedS = new MessageEmbed()
                    .setDescription('Feature give-system telah berhasil diaktifkan!')
                    .setColor("GREEN")
                    .setFooter({ text: `Ketik ${guild.prefix}myconfig untuk melihat semua pengaturan di guild!`})
                    .setTimestamp()
                    message.channel.send({ embeds: [embedS] });
                });
            }

        } catch (err) {
            message.reply('Error Found! Pls contact owner!')
            return console.log()
        }
    }
}