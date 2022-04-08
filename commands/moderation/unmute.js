const { Message, MessageEmbed, Permissions } = require('discord.js');
const db = require('quick.db');
const Guild = require("../../models/Guild");

module.exports = {
    name:'unmute',
    category:'moderation',
    description:'Membuka mute member',
    usage:'<member>',
    aliases:['lepas'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let author = message.guild.members.cache.get(message.author.id);
            if (!author.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
                return message.reply(`Kamu nggapunya hak untuk akses ini!`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            // Get data from Guild.modules //
            let data = await Guild.findOne({
                guildID: message.guild.id
            });
            if (!data) return;

            const mutedRole = message.guild.roles.cache.get(data.role.mutedRole);
            if (!mutedRole) return message.reply(`Muted role tidak tersedia!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            // Check modlog
            const modlog = client.channels.cache.get(data.channel.modlog);
            if (!modlog) return message.reply('Please setup this bot first!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            // Check target //
            if (!target) 
                return message.reply("Member tidak ditemukan.").then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            if (target.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) 
                return message.reply("I do not have permission to muted Administrator").then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            if (target.user.id == author) 
                return message.reply("You idiot? why you unmute your self? Ba-baka!").then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            if (!target.roles.cache.has(mutedRole.id))
                return message.reply('This user is not muted!').then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            
            // Find data //
            let dataquick = new db.table('Mutes')
            let korban = await dataquick.fetch(target.user.id)
            console.log('Data found at quick.db');
            if (!korban) return;
            let korban_role = dataquick.get(target.user.id)

            // Giveback member roles //
            for (let i = 0; i < korban_role.length; i++) {
                target.roles.add(korban_role[i])
            }

            // Give mutedroles //
            await target.roles.remove(mutedRole).then(() => {
                message.delete()
                message.channel.send(`**${target.user.tag}** telah bebas dari mute`).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            })

            // Delete data from quick.db //
            await dataquick.delete(target.user.id)
            
            // Send embed to modlog //
            let embedmodlog = new MessageEmbed()
                .setTitle(`📩 New Unmuted`)
                .setColor(client.config.berhasil)
                .addField("👨🏻 User", target.user.username)
                .addField("👮🏻‍♂️ Moderator", message.author.username)
                .setTimestamp()
            modlog.send({ embeds: [embedmodlog] });

        } catch(error) {
            return console.log(error);
        }

    }
}