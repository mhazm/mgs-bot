const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require("../../models/Guild.js");

module.exports = {
    name: "setprefix",
    aliases: ["setch"],
    description: "Setting prefix",
    usage: "<newprefix>",
    category: "settings",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`);

            let data = await Guild.findOne({
                guildID: message.guild.id
            });

            const newprefix = args[0];
            if (!newprefix) return message.reply(`Are you stupid? Please give me new prefix!`);

            const modlog = client.channels.cache.get(data.channel.modlog);

            let embed = new MessageEmbed()
                .setDescription(`Berhasil setting prefix menjadi ${newprefix}`)
                .setTimestamp(new Date())
                .setColor(client.config.berhasil)
            message.channel.send({ embeds: [embed] });
            data.prefix = newprefix; data.save();

            // Send Report to ModLog
            let report = new MessageEmbed()
                .setDescription(`User **${message.author.username}** mengubah welcome channel ke ${newprefix}`)
                .setTimestamp(new Date())
                .setColor(client.config.berhasil)
            modlog.send({ embeds: [report] });

        } catch(error) {
            return console.log(error);
        };
    },
};