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
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Member tidak ditemukan!.').then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const reason = args.slice(1).join(" ");
            if (!reason) return message.reply('Tolong berikan alasannya kenapa member tersebut terkena warn!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
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
                return message.reply(
                    `Please setup this bot first with ${guild.prefix}setup or setting modlog channel with ${guild.prefix}setch modlog`
                ).then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });
            }

            // Role Warn
            const warn1Role = message.guild.roles.cache.get(guild.role.warn1);
            if (!warn1Role) return message.reply(`Muted role tidak tersedia!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });
            const warn2Role = message.guild.roles.cache.get(guild.role.warn2);
            if (!warn2Role) return message.reply(`Muted role tidak tersedia!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });
            const warn3Role = message.guild.roles.cache.get(guild.role.warn3);
            if (!warn3Role) return message.reply(`Muted role tidak tersedia!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

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

            
            // Calculate Fined
            let warnTotal = target.warn;

            const finedMin = guild.fined.min;
            const finedMax = guild.fined.max;
            let fined = Math.floor(Math.random() * (finedMax - finedMin + 100) + finedMin * warnTotal * 15);
                        
            // Give warn to Profile
            target.money -= fined;
            target.warn++;
            target.save();
            
            // GIVE WARN ROLE
            if (target.warn >= 2) {
                user.roles.add(warn1Role)
            } if (target.warn >= 4) {
                user.roles.add(warn2Role)
                user.roles.remove(warn1Role)
            } if (target.warn >= 8 ) {
                user.roles.add(warn3Role)
                user.roles.remove(warn2Role)
            };
         
            // Sending DM to Target
            const modnickname = message.author.username
            const guildname = message.member.guild.name

            let embedUser = new MessageEmbed()
                .setTitle(`Kamu mendapatkan Warning di server ${guildname}`)
                .setDescription(`Tolong untuk mengikuti peraturan server yang berlaku agar terhindar dari kesalahan dan dapat menyebabkan kamu dikeluarkan dari server ${guildname}`)
                .addField("Moderator", modnickname)
                .addField("Denda", `Rp. ${fined}`)
                .addField("Alasan", `\`\`\`${reason}\`\`\``)
                .setColor("RED")
                .setTimestamp()
            user.send({ embeds: [embedUser] });

            let embedModlog = new MessageEmbed()
                .setTitle(`New Warning!`)
                .setColor(client.config.warning)
                .addField("Target", user.user.username, true)
                .addField("Denda", `Rp. ${fined}`)
                .addField("Moderator", message.author.username, true)
                .addField("Alasan", `\`\`\`${reason}\`\`\``)
                .setTimestamp()
            modlog.send({ embeds: [embedModlog] })

            let report = new MessageEmbed()
                .setDescription(`Warned ${user.user.username}#${user.user.tag} because ${reason}`)
                .addField("Denda", `Rp. ${fined}`)
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