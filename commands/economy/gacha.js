const { Client, Message, MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild.js');
const User = require('../../models/User.js');
const ms = require('ms')
const Role = require('../../models/Role.js');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'gacha',
    aliases: ["judi"],
    description: "Judi Point!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const user = message.guild.members.cache.get(message.author.id);

            const guild = await Guild.findOne({
                guildID: message.guild.id,
            });

            const data = await User.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });

            if (!guild) return;
            if (!data) return;
            if (message.author.bot) return;

            const modlog = client.channels.cache.get(guild.channel.modlog)
            if (!modlog) {
                return message.reply(`Tolong bilang admin untuk set dulu moderator log dengan menggunakan command ${guild.prefix}setch modlog <tag channel>`);
            };

            let priceJudi = parseInt(1);
            let point = parseInt(data.point);
            
            if (point < priceJudi) {
                return message.reply(`Sadar oy, dirimu nggapunya point buat main!`);
            }

            const luck = Math.floor(Math.random() * (100 - 0) + 0);

            const prizeSmall = parseInt(Math.floor(Math.random() * (150 - 50) + 50));
            const prizeMed = parseInt(Math.floor(Math.random() * (200 - 50) + 110));
            const prizeHigh = parseInt(Math.floor(Math.random() * (500 - 150) + 410));
            
            if (luck <= 10) {                
               
                let e = new MessageEmbed()
                .setDescription(`Ah... kamu kurang beruntung! Silahkan coba lagi nanti ya~`)
                .setColor("GREEN")
                await message.channel.send({ embeds: [e] })
            } else if (luck <= 40) {
                data.money += prizeSmall;
                data.point -= priceJudi;
                data.save();

                let e = new MessageEmbed()
                .setDescription(`Selamat kamu mendapatkan hadiah berupa uang ${client.util.currency(prizeSmall)}`)
                .setFooter({ text: `Luck kamu saat ini: ${luck}`})
                .setColor("GREEN")
                await message.channel.send({ embeds: [e] })
            } else if (luck <= 70) {
                data.money += prizeMed;
                data.point -= priceJudi;
                data.save();

                let e = new MessageEmbed()
                .setDescription(`Selamat kamu mendapatkan hadiah berupa uang ${client.util.currency(prizeMed)}`)
                .setFooter({ text: `Luck kamu saat ini: ${luck}`})
                .setColor("GREEN")
                await message.channel.send({ embeds: [e] })
            } else if (luck <= 89) {
                data.money += prizeHigh;
                data.point -= priceJudi;
                data.save();

                let e = new MessageEmbed()
                .setDescription(`Selamat kamu mendapatkan hadiah berupa uang ${client.util.currency(prizeHigh)}`)
                .setFooter({ text: `Luck kamu saat ini: ${luck}`})
                .setColor("GREEN")
                await message.channel.send({ embeds: [e] })
            } else if (luck >= 95) {
                let e = new MessageEmbed()
                .setDescription(`Selamat kamu mendapatkan hadiah berupa **VIP Role** selama **7 Hari**!`)
                .setFooter({ text: `Luck kamu saat ini: ${luck}`})
                .setColor("GREEN")
                message.channel.send({ embeds: [e] })

                const roleGiven = message.guild.roles.cache.find(r => r.id === guild.role.vipRole);
                if (!roleGiven) return message.reply(`Upps! Role VIP tidak ditemukan!`);

                let roleDb = await Role.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id,
                    roleID: roleGiven.id
                });

                let date = ms('7d'); // 7 Days
                const expiredDate = moment().millisecond(date);
                const finalDate = expiredDate.toISOString();

                if (!roleDb) {
                    Role.create({
                        guildID: message.guild.id,
                        userID: message.author.id,
                        roleID: roleGiven.id,
                        expired: finalDate,
                        moderator: message.author.id,
                    });
    
                    let embedSuc = new MessageEmbed()
                    .setTitle(`Role Added!`)
                    .addField('Role', `<@&${roleGiven.id}>`)
                    .addField('Expired', client.util.formatday(expiredDate))
                    .addField('Member', `<@${user.user.id}>`)
                    .addField('Moderator', `Gacha!!`)
                    .setColor(client.config.berhasil)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    user.roles.add(roleGiven.id);
                    message.channel.send({ embeds: [embedSuc] });
                    data.point -= priceJudi;
                    data.save()
                } else {
                    let date = ms('7d'); // 7 Days
                    const extendDate = moment().millisecond(date);
                    const nowDate = roleDb.expired;
                    const final = new Date(nowDate + extendDate)
                    const finalDate = final.toISOString();

                    roleDb.expired = finalDate;
                    roleDb.save();

                    let emNot = new MessageEmbed()
                    .setTitle(`Role Extended!`)
                    .addField('Role', `<@&${roleGiven.id}>`)
                    .addField('Expired', client.util.formatday(roleDb.expired))
                    .setColor(client.config.berhasil)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    message.channel.send({ embeds: [emNot] });
                    data.point -= priceJudi;
                    data.save()
                };

                if (!user.roles.cache.has(roleGiven.id)) {
                    user.roles.add(roleGiven.id);
                };

            }
        } catch(err) {
            message.reply(`Error nih bos, report ke admin!`)
            return console.log(err);
        };
    }
}