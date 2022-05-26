const { Client, Message, MessageEmbed } = require('discord.js');
const CustomRole = require('../../models/CustomRole.js');
const moment = require('moment-timezone');
const VIPRole = require('../../models/VIPRole.js');

module.exports = {
    name: 'myrole',
    description: 'Melihat dan mengedit custom role',
    aliases: ["mr"],
    usage: '<args>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            moment.locale('id');
            if (args[0] === 'typing') {
                let data = await CustomRole.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id,
                });
        
                if (!data) return message.reply(`Maaf, kamu ngga punya custom role. Jadi nggabisa pakai fitur ini`).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });

                const myRole = message.guild.roles.cache.find(r => r.id === data.roleID);
                const createdDate = moment.tz(data.createdDate, 'Asia/Jakarta').format('LLLL');
                const guildicon = message.guild.iconURL({ dynamic: true });
                let icon = myRole.iconURL()
                if (!icon) {
                   icon = guildicon;
                }

                let memberWithRole = message.guild.roles.cache.get(myRole.id);
                
                let embedMyRole = new MessageEmbed()
                    .setTitle(`:clipboard: | ${myRole.name} Information`)
                    .setThumbnail(icon)
                    .setColor(myRole.color)
                    .addField(`:bust_in_silhouette: Owner`, `<@${data.userID}>`)
                    .addField(`:calendar_spiral: Created Date`, createdDate)
                    .addField(`:family_woman_boy: Size Member`, `${memberWithRole.members.size} User`)
                    .addField(`:family_man_girl_girl: Member in Role`, `${memberWithRole.members.map((a) =>  `<@${a.user.id}>`).join('\n')}`)
                    .setTimestamp()
                message.channel.send({ embeds: [embedMyRole] });
            } else if (args[0] === 'vip') {
                let data = await VIPRole.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id,
                });
        
                if (!data) return message.reply(`Maaf, kamu ngga punya custom role. Jadi nggabisa pakai fitur ini`).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });

                const myRole = message.guild.roles.cache.find(r => r.id === data.roleID);
                const createdDate = moment.tz(data.createdDate, 'Asia/Jakarta').format('LLLL');
                const guildicon = message.guild.iconURL({ dynamic: true });
                let icon = myRole.iconURL()
                if (!icon) {
                   icon = guildicon;
                }

                let memberWithRole = message.guild.roles.cache.get(myRole.id);
                
                let embedMyRole = new MessageEmbed()
                    .setTitle(`:clipboard: | ${myRole.name} Information`)
                    .setThumbnail(icon)
                    .setColor(myRole.color)
                    .addField(`:bust_in_silhouette: Owner`, `<@${data.userID}>`)
                    .addField(`:calendar_spiral: Created Date`, createdDate)
                    .addField(`:family_woman_boy: Size Member`, `${memberWithRole.members.size} User`)
                    .addField(`:family_man_girl_girl: Member in Role`, `${memberWithRole.members.map((a) =>  `<@${a.user.id}>`).join('\n')}`)
                    .setTimestamp()
                message.channel.send({ embeds: [embedMyRole] });
            }
            
        } catch(error) {
            return console.log(error);
        }

    }
}