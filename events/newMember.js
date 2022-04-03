const client = require('../index.js');
const Discord = require('discord.js');
const Guild = require('../models/Guild.js');

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

        // Embed Creator
        const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome ${member.user.tag}`)
        .setColor(client.config.colorEmbed)
        .setDescription(`Hei ${member.user.tag}, Selamat datang di **${member.guild.name}** ヾ(≧▽≦*)o`)

        // Send Embed
        channel.send({ embeds: [embed] })
    } catch (error) {
        return console.log(error);
    }
})