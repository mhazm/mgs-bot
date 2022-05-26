const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const db = require('../../models/CustomRole.js');
const vip = require('../../models/VIPRole.js');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'claimlist',
    description: 'Melihat daftar role yang sudah dibuat dari claim VIP',
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

            if (args[0] === 'typing') {
                db.findOne({ guildID: message.guild.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        let mappedData = [data].map(
                            (w, i) => 
                            `\`${i + 1}.\` <@&${w.roleID}> oleh <@${w.userID}>\nAktif Sejak : ${moment.tz(w.createdDate, "Asia/Jakarta").format("LLLL")}`
                        ).join('\n');
    
                        let embed = new MessageEmbed()
                            .setTitle(`<a:bintang:819855110754271252> Daftar claim role oleh Typing Lord Member`)
                            .setDescription(`${mappedData}`)
                            .setColor("RANDOM")
                            .setThumbnail(message.guild.iconURL({ dynamic: true}))
                            .setTimestamp()
                        message.channel.send({ embeds: [embed] });
                    } else {
                        let e = new MessageEmbed()
                        .setTitle(`<a:bintang:819855110754271252> Daftar claim role oleh Typing Lord Member`)
                        .setDescription('Tidak ada member yang melakukan claim')
                        .setColor("RANDOM")
                        .setThumbnail(message.guild.iconURL({ dynamic: true}))
                        .setTimestamp()
                        message.channel.send({ embeds: [e] })
                    }
                })

            } else if (args[0] === 'vip') {
                vip.findOne({ guildID: message.guild.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        let mappedData = [data].map(
                            (w, i) => 
                            `\`${i + 1}.\` <@&${w.roleID}> oleh <@${w.userID}>\nAktif Sejak : ${moment.tz(w.createdDate, "Asia/Jakarta").format("LLLL")}`
                        ).join('\n');
    
                        let embed = new MessageEmbed()
                            .setTitle(`<a:bintang:819855110754271252> Daftar claim role oleh VIP Member`)
                            .setDescription(`${mappedData}`)
                            .setColor("RANDOM")
                            .setThumbnail(message.guild.iconURL({ dynamic: true}))
                            .setTimestamp()
                        message.channel.send({ embeds: [embed] });
                    } else {
                        let e = new MessageEmbed()
                        .setTitle(`<a:bintang:819855110754271252> Daftar claim role oleh VIP Member`)
                        .setDescription('Tidak ada member yang melakukan claim')
                        .setColor("RANDOM")
                        .setThumbnail(message.guild.iconURL({ dynamic: true}))
                        .setTimestamp()
                        message.channel.send({ embeds: [e] })
                    }
                })
            };

        } catch(error) {
            return console.log(error);
        };
    },
};