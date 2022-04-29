const { Client, Message, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const Guild = require('../../models/Guild');
const { statusPTC, walletTip } = require('../../handler/profileHelper');

module.exports = {
    name: 'money',
    aliases: ["uang"],
    category: "economy",
    description: "Melihat uang yang telah di dapatkan",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        try {
            const user = await User.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });
            if (!user) return;

            const guild = await Guild.findOne({
                guildID: message.guild.id,
            })
            if (!guild) return;

            // Get Data
            let userMoney = formatter.format(user.money);
            if (!userMoney) {
                userMoney = 0;
            }

            let guildBalance = formatter.format(guild.budget);

            // Creating Embed
            let e = new MessageEmbed()
            .setTitle(`<:bmoney:836506631063470090> MGS Bank`)
            .setColor("GREEN")
            .addField(`<:wallet:831610603545559082> Guild Balance`, guildBalance, true)
            .addField(`:lock: Status Penukaran`, statusPTC(guild.active.convert), true)
            .addField(`<:wallet:836507553357496321> Your Balance`, userMoney, true)
            .addField(`<a:bintang:819855110754271252> Your Points`, `${user.point} Points`, true)
            .addField(`<:chat:968324799581528154> Total Messages`, `${user.messages || `0`}`, true)
            .setFooter({text: `${walletTip()}`, iconURL: message.author.displayAvatarURL({dynamic:true})})
            message.channel.send({ embeds: [e]})
            
        } catch(err) {
            return console.log(err);
        };

    },
}