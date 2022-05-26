const { Client, Message, MessageEmbed } = require('discord.js');
const VIPRole = require('../../models/VIPRole.js');
const Guild = require('../../models/Guild.js');
const moment = require('moment-timezone');

module.exports = {
    name: 'vipclaim',
    description: 'Claim custom role',
    usage: '<nama role>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            moment.locale('id');
            const guildData = await Guild.findOneAndUpdate({
                guildID: message.guild.id,
            });

            if (!guildData) return;

            const modlog = client.channels.cache.get(guildData.channel.modlog);
            if (!modlog)  {
                return message.reply(
                    `Please setup this bot first or setting modlog channel with ${guildData.prefix}setch modlog\nSee all command on ${guildData.prefix}help`
                    ).then(msg => {
                        setTimeout(() => msg.delete(), 3000)
                    });
            }

            const author = message.guild.members.cache.get(message.author.id);
            const rolevip = message.guild.roles.cache.find(r => r.id === guildData.role.vipRole);
            if (!rolevip) return message.reply(`Role VIP ngga ada di database!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            const roleUpPosition = message.guild.roles.cache.find(r => r.id === guildData.role.upCrRole);
            if (!roleUpPosition) {
                return message.reply(
                    `Role up Position not found! Please setting role position with channel with ${guildData.prefix}setrole pos\nSee all command on ${guildData.prefix}help`
                    ).then(msg => {
                        setTimeout(() => msg.delete(), 3000)
                    });
            }
            
            const rolename = args.join(' ').toString();
            if (!rolename) {
                return message.reply('Kamu harus memasukan nama role yang ingin kamu buat!').then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                  });
            }
          
            if (!author.roles.cache.has(rolevip.id)) {
                let fail = new MessageEmbed()
                    .setDescription(`❌ Kamu tidak mempunyai role <@&${rolevip.id}> sebagai syarat untuk membuat custom role`)
                    .setTimestamp()
                    return message.channel.send({ embeds: [fail] }).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                      });
            }

            const customDB = await VIPRole.findOne({
                userID: message.author.id,
                guildID: message.guild.id,
            });

            if (!customDB) {
                if (author.roles.cache.has(rolevip.id)) {
                    // Create a new role with data and a reason
                    message.guild.roles.create({
                        name: rolename,
                        color: 'BLUE',
                        reason: 'Custom role [VIP Member]',
                    })
                    .then(role => {
                        const roleCreated = message.guild.roles.cache.get(role.id);
                        roleCreated.setPosition(roleUpPosition.position + 1);
                        author.roles.add(role.id);

                        //Saving data to DB
                        VIPRole.create({
                            userID: message.author.id,
                            guildID: message.guild.id,
                            roleID: role.id,
                            createdDate: new Date(),
                        })

                        let embedNotif = new MessageEmbed()
                        .setTitle(`<a:verified:962503696288215051> Claimed VIP Custom Role`)
                        .setColor('RANDOM')
                        .addField(`Nama Role`, role.name)
                        .addField(`Created Date`, client.util.formatday(new Date()))
                        .setThumbnail(author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                        message.channel.send({ embeds: [embedNotif] });

                        let embedMod = new MessageEmbed()
                        .setTitle(`<a:verified:962503696288215051> ${message.author.username} Claim Custom Role`)
                        .setColor(client.config.berhasil)
                        .addField(`Nama Role`, role.name)
                        .addField(`Created Date`, client.util.formatday(new Date()))
                        .setThumbnail(author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                        modlog.send({ embeds: [embedMod] });
                    })
                    .catch(console.error);
                }
            } else {
                const getRoleCache = message.guild.roles.cache.get(customDB.roleID);
                let embedA = new MessageEmbed()
                    .setColor(client.config.gagal)
                    .setDescription(`<a:RIP:819857554955829248> Kamu telah melakukan claim VIP custom role dengan nama ***${getRoleCache.name}***`)
                    .addField(`Aktif Sejak`, client.util.formatday(customDB.createdDate))
                message.channel.send({ embeds: [embedA] });
            }
        } catch(error) {
            return console.log(error)
        }
    }
}