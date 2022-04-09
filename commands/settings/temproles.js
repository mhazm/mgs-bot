const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const ms = require('ms')
const Role = require('../../models/Role.js');
const moment = require("moment");

module.exports = {
    name: 'temproles',
    aliases: ["tr"],
    usage: '<member> <role> <duration>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try{
            moment.locale('id');
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Member tidak ditemukan!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const roleGiven = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
            if (!roleGiven) return message.reply('Role tidak ditemukan!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const expired = ms(args[2]);
            if (!expired) return message.reply('Kamu harus memasukan waktu expired!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const expiredDate = moment().millisecond(expired);
            const finalDate = expiredDate.toISOString();

            if (user.roles.cache.has(roleGiven.id)) {
                return message.reply('User telah mempunyai role tersebut!')
            };
            
            let roleDb = await Role.findOne({
                guildID: message.guild.id,
                userID: user.user.id,
                roleID: roleGiven.id
            });

            if (!roleDb) {
                Role.create({
                    guildID: message.guild.id,
                    userID: user.user.id,
                    roleID: roleGiven.id,
                    expired: finalDate,
                    moderator: message.author.id,
                });

                let embedSuc = new MessageEmbed()
                .setTitle(`Role Added!`)
                .addField('Role', `<@&${roleGiven.id}>`)
                .addField('Expired', expiredDate.format("Do MMMM YYYY"))
                .addField('Member', `<@${user.user.id}>`)
                .addField('Moderator', `<@${message.author.id}>`)
                .setColor(client.config.berhasil)
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                user.roles.add(roleGiven.id);
                return message.channel.send({ embeds: [embedSuc] });
            } else {
                let formatDateEx = moment.utc(roleDb.expired).format("Do MMMM YYYY");
                return message.reply(`Member sudah punya temp role tersebut dan akan berakhir pada ${formatDateEx}`)
            };          

        } catch(err) {
            return console.log(err);
        };

    },
};