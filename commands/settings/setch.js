const Discord = require("discord.js");
const Guild = require("../../models/Guild.js");

module.exports = {
    name: "settingchannel",
    aliases: ["setch"],
    description: "Setting channel",
    usage: "<setting name> <channel>",
    category: "settings",
    run: async(client, message, args) => {
        try {          
            if (!message.member.permissions.has([Discord.Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`);

            let data = await Guild.findOne({
                guildID: message.guild.id
            });
    
            // Get modlog Channel
            const modlog = client.channels.cache.get(data.channel.modlog);
            if (!modlog) return;
    
            if(!args[0]) {
                let err = new Discord.MessageEmbed()
                    .setDescription('Kamu harus menggunakan arguments untuk mensetting channel.\nContoh: !setch <args> <channel>\n\nList Argument bisa dilihat dibawah ini')
                    .addField('List Agruments', '1. welcome\n2. modlog')
                    .setColor(client.config.warning)
                return message.channel.send({ embeds: [err] });
            }
    
            if (args[0].toLowerCase() === 'welcome') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting welcome channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.welcome = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'bye') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting bye channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.bye = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'modlog') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting modlog channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.modlog = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'afk') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting afk channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.afk = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'story') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting story channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.story = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'income') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting income channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.income = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'chatmoney') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting chatmoney channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.chatmoney = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'levelup') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting levelup channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.levelup = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            } else
            if (args[0].toLowerCase() === 'isolasi') {
                let channel =  message.mentions.channels.first();
                if(!channel) return message.channel.send("Tolong di tag dulu channelnya!");
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Berhasil setting isolasi channel di ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.channel.isolasi = channel.id; data.save();
    
                // Send Report to ModLog
                let report = new Discord.MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            }
        } catch (error) {
            return message.channel.send({ content: `Something went wrong: ${error.message}` });
            // Restart the bot
        };
    },
};