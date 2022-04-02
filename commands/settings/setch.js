const Discord = require("discord.js");
const Guild = require("../../models/Guild.js");

module.exports = {
    name: "settingchannel",
    aliases: ["setch"],
    description: "Setting channel",
    usage: "<setting name> <channel>",
    category: "settings",
    run: async(client, message, args) => {
        let data = await Guild.findOne({
            guildID: message.guild.id
        });

        // Get modlog Channel
        const modlog = client.channels.cache.get(data.modlogChannel);

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
            data.welcomeChannel = channel.id; data.save();

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
            data.byeChannel = channel.id; data.save();

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
            data.modlogChannel = channel.id; data.save();

            // Send Report to ModLog
            let report = new Discord.MessageEmbed()
                .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${channel}`)
                .setTimestamp(new Date())
                .setColor(client.config.berhasil)
            modlog.send({ embeds: [report] });
        }
    },
};