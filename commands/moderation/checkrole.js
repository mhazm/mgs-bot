const { Client, Message, MessageEmbed, Permissions, } = require('discord.js');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'checkrole',
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

            let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[0]);
            if(!role) return message.channel.send("Tolong di tag dulu rolenya!");

            const guildicon = message.guild.iconURL({ dynamic: true });
            let icon = role.iconURL()
            if (!icon) {
                icon = guildicon;
            }

            let memberWithRole = message.guild.roles.cache.get(role.id);

            let memberList = memberWithRole.members.map((a) => `<@${a.user.id}>`).join('\n');
            if (memberList.length > 2046) memberList = 'Usernya kebanyakan untuk ditampilin';
            if (!memberList) memberList = 'Ngga ada user yg disini...'

            let e = new MessageEmbed()
            .setTitle(`Role ${role.name} check`)
            .setColor(role.color)
            .setThumbnail(icon)
            .setDescription(`:family_man_girl_girl: **Member List**\n${memberList}`)
            .addField(`:calendar_spiral: Created`, moment.tz(role.createdTimestamp, 'Asia/Jakarta').format('dddd, DD/MM/YYYY hh:mm zz'))
            .addField(`:family_woman_boy: Size Member`, `${memberWithRole.members.size} User`)
            .setTimestamp()
            message.channel.send({
                embeds: [e],
            });

        } catch(err) {
            return console.log(err);
        }
    }
}