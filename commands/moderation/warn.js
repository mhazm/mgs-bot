const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Warn = require('../../models/Warn.js');
const Guild = require('../../models/Guild.js');
const User = require('../../models/User.js');

module.exports = {
    name: 'warn',
    description: 'Memberikan warning kepada member',
    usage: '<Member> <Reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const author = message.guild.members.cache.get(message.author.id);

            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`);

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Member tidak ditemukan!.');

            const reason = args.slice(1).join(" ");
            if (!reason) return message.reply('Tolong berikan alasannya kenapa member tersebut terkena warn!');

            // Warn DB Schema            
            Warn.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new Warn({
                        guildid: message.guild.id,
                        user : user.user.id,
                        content : [
                            {
                                moderator : message.author.id,
                                reason : reason
                            }
                        ]
                    })
                } else {
                    const obj = {
                        moderator: message.author.id,
                        reason : reason
                    }
                    data.content.push(obj)
                }
                data.save()
            });

            // Find Target DB

            let target = await User.findOne({
                guildID: message.guild.id,
                userID: user.user.id,
            });
    
            if (!target) return bot.nodb(member.user);

            //MODLOG DATA CHANNEL
            let guild =  await Guild.findOne({
                guildID: message.guild.id
            });

            const modlog = client.channels.cache.get(guild.channel.modlog);
            if (!modlog) {
                return message.reply(`Please setup this bot first with ${guild.prefix}setup or setting modlog channel with ${guild.prefix}setch modlog`)
            }

            // Give warn to Profile
            target.warn++;
            target.save();

            // Sending DM to Target
            const modnickname = message.author.username
            const guildname = message.member.guild.name

            let embedUser = new MessageEmbed()
                .setTitle(`Kamu mendapatkan Warning di server ${guildname}`)
                .setDescription(`Tolong untuk mengikuti peraturan server yang berlaku agar terhindar dari kesalahan dan dapat menyebabkan kamu dikeluarkan dari server ${guildname}`)
                .addField("Moderator", modnickname)
                .addField("Alasan", `\`\`\`${reason}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            user.send({ embeds: [embedUser] })

            let embedModlog = new MessageEmbed()
                .setTitle(`New Warning!`)
                .setColor(client.config.warning)
                .addField("Target", user.user.username, true)
                .addField("Moderator", message.author.username, true)
                .addField("Alasan", `\`\`\`${reason}\`\`\``)
                .setTimestamp()
            modlog.send({ embeds: [embedModlog] })

            let report = new MessageEmbed()
                .setDescription(`Warned ${user.user.username}#${user.user.tag} because ${reason}`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({ embeds: [report] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
        } catch (error) {
            return console.log(error);
        };
    },
};