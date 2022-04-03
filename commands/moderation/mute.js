const { Message, MessageEmbed, Permissions } = require("discord.js");
const db = require('quick.db');
const Guild = require("../../models/Guild");
const User = require('../../models/User');

module.exports = {
    name:'mute',
    category:'moderation',
    description:'Membisukan member',
    usage:'<member>',
    aliases:['bisu'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const author = message.guild.members.cache.get(message.author.id);
            let guildname = message.guild.name;
            
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`);

            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!target) return message.reply('Member tidak ditemukan!.');

            if (target.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
                return message.reply('Kamu nggabisa bisukan moderator!');
            if (target.user.id === author)
                return message.reply('Masokis??! Ba-baka!');
            if (message.member.roles.highest.position <= target.roles.highest.position)
                return message.reply('Tidak sopan untuk mute seseorang yang lebih tinggi daripada kamu..');
            
            let reason = args.slice(1).join(` `);
            if (!reason) reason = "Tidak ada alasan";

            // Get Guild & User Data from DB
            let data = await Guild.findOne({
                guildID: message.guild.id,
            });

            let datauser = await User.findOne({
                guildID: message.guild.id,
                userID: target.user.id,
            });

            if(!datauser.muted) {
                await User.findOneAndUpdate({
                    userID: target.user.id,
                    guildID: message.guild.id,
                },
                {
                muted: 1
                })
            }

            // Check Muted Role
            const mutedRole = message.guild.roles.cache.get(data.role.mutedRole);
            if (!mutedRole) return message.reply(`Muted role tidak tersedia!`);

            if (target.roles.cache.has(mutedRole.id))
            return message.reply(`Anda terlalu kejam pak, orang ini udah gabisa ngomong.`);

            // Check Puskesmas
            const isolasi = client.channels.cache.get(data.channel.isolasi);
            if (!isolasi) return message.reply('Ruang isolasi tidak tersedia.');

            // Check modlog
            const modlog = client.channels.cache.get(data.channel.modlog);
            if (!modlog) return message.reply('Please setup this bot first!');

            // Save data on Quickdb
            let dataquick = new db.table('Mutes')
            await dataquick.set(target.user.id, target._roles)
            console.log('Saving to quick.db completed');

            // Takes member Roles //
            for (let i = 0; i < target._roles.length; i++) {
                target.roles.remove(target._roles[i])
            }

            // Give them mutedRole
            await target.roles.add(mutedRole).then(() => {
                message.channel.send(`**${target.user.tag}** telah dimute\nAlasan: ${reason}`);
                datauser.muted++;
                datauser.save();
            })

            target.send(`Kamu telah mendapatkan mute di ${guildname} dengan alasan ${reason}\n**By ${message.author.username}**`);

            let embed1 = new MessageEmbed()
            .setTitle('📩 New Muted')
            .setColor('RED')
            .addField('👨🏻 Target', `${target.user.username || `Unknown`}`, true)
            .addField('👮🏻‍♂️ Moderator', `${message.author.username || `Unknown`}`, true)
            .addField("Reason", `\`\`\`${reason}\`\`\``)
            .setTimestamp()
            modlog.send({ embeds: [embed1]});
            
            // Send Message to Isolasion Room
            isolasi.send(`Halo <@${target.id}>!\nSelamat datang diruang isolasi. Kamu bisa contact admin dan meminta bantuan dari sini.\nKamu mendapatkan muted karena : ${reason}`);
        } catch (error) {
            return console.log(error);
        };
    }
}