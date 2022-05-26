const { Client, Message, MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild.js');
const User = require('../../models/User.js');

module.exports = {
    name: 'takemoney',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (message.author.id !== process.env.OWNERID)
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            let user =
            message.mentions.members.first() ||
            messsage.guild.members.cache.get(args[0]);
            
            const target = await User.findOne({ guildID: message.guild.id, userID: user.id });
            if (!target) return;

            const member = message.guild.members.cache.get(user.id);
            if (member.bot) return message.reply("Its A Bot -_-");

            const guild = await Guild.findOne({ guildID: message.guild.id });
            if (!guild) return;

            const nows = new Date();
            
            const nominal = parseInt(args[1]);

            target.money -= parseInt(nominal);
            target.save();

            let em = new MessageEmbed()
                .setTitle(`:coin: Take money!`)
                .setColor(client.config.berhasil)
                .setDescription(`Pengambilan uang sukses! Diambil senilai ${client.util.currency(nominal)}\nSaldo ${member.user.username} saat ini adalah ${client.util.currency(target.money)}`)
            message.channel.send({ embeds: [em] });

            let memNotif = new MessageEmbed()
                .setTitle(`:coin: Take Money!`)
                .setColor(client.config.gagal)
                .addField(`Nominal`, client.util.currency(nominal), true)
                .addField(`Admin`, message.author.username, true)
                .addField(`Tanggal`, client.util.formatday(nows))
                .addField(`Uangmu saat ini`, client.util.currency(target.money))
                .setTimestamp()
            member.send({ embeds: [memNotif] });

            const modlog = client.channels.cache.get(guild.channel.modlog);
            let notifembed = new MessageEmbed()
                .setColor("RED")
                .setTitle(`:coin: Take Money!`)
                .addField(`Nominal`, client.util.currency(nominal), true)
                .addField(`Admin`, message.author.username, true)
                .addField(`Tanggal`, client.util.formatday(nows))
                .addField(`Uangmu saat ini`, client.util.currency(target.money))
                .setTimestamp()
            modlog.send({embeds : [notifembed]});
        } catch(err) {
            return console.log(err);
        };
    }
}