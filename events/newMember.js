const client = require('../index.js');
const Discord = require('discord.js');
const Guild = require('../models/Guild.js');
const User = require('../models/User.js');

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

        // Embed Creator
        const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome ${member.user.username}`)
        .setColor(client.config.colorEmbed)
        .setDescription(`Hei ${member.user.username}, Selamat datang di **${member.guild.name}** ヾ(≧▽≦*)o`)

        // Send Embed
        channel.send({ content: `Hello <@${member.user.id}>!`, embeds: [embed] })
    } catch (error) {
        return console.log(error);
    }
})