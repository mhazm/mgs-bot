const client = require('../index.js');
const Discord = require('discord.js');
const Guild = require('../models/Guild.js');
const User = require('../models/User.js');
const gif = require('nekos.life');
const { sfw } = new gif()

client.on('guildMemberAdd', async(member) => {
    try {
        const data = await Guild.findOne({
            guildID: member.guild.id,
          });
        if (!data) return;
        
        // Check active or not
        const status = data.active.welcome;
        if (status === false) return;
        
        // Check channel available or not
        const channel = member.guild.channels.cache.get(data.channel.welcome);
        if (!channel) return;

        let user = await User.findOne({
            guildID: member.guild.id,
            userID: member.user.id,
        });

        if (!user) {
            const account = {
                username: member.user.username,
                userId: member.user.id,
            }
            User.create({
                account,
                guildID: member.guild.id,
                userID: member.user.id,
            })
        };

        let hug = await sfw.hug();

        // Embed Creator
        const embed = new Discord.MessageEmbed()
            .setTitle(`Welcome ${member.user.username}`)
            .setThumbnail(member.avatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(
                `Hei ${member.user.username}, Selamat datang di **${member.guild.name}** ヾ(≧▽≦*)o
                Jangan takut untuk chatting dan menyapa member yang lainnya ya! Tenang aja, kita ngga gigit kok..
            `)
            .addField(`📑 Rules Server`, `<#853884085218181170>`, true)
            .addField(`📓 Server Info`, `<#969264604226134076>`, true)
            .addField(`📦 Ambil Role`, `<#853913768999780353>`, true)
            .setImage(hug.url)
            .setTimestamp()
            .setFooter({ text: `Guys! Pls say hai ke ${member.user.username} ya!`, iconURL: member.avatarURL({ dynamic: false })})

        // Send Embed
        channel.send({ content: `Hello <@${member.user.id}>!`, embeds: [embed] })
    } catch (error) {
        return console.log(error);
    }
})