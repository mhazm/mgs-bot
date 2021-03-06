const client = require('../index.js');
const Discord = require('discord.js');
const Guild = require('../models/Guild.js');
const gif = require('nekos.life');
const { sfw } = new gif()

client.on('guildMemberRemove', async(member) => {
    try {
        const data = await Guild.findOne({
            guildID: member.guild.id,
          });
        if (!data) return;
        
        // Check active or not
        const status = data.active.welcome;
        if (status === false) return;
        
        // Check channel available or not
        const channel = member.guild.channels.cache.get(data.channel.bye);
        if (!channel) return;

        let pat = await sfw.pat();

        // Embed Creator
        const embed = new Discord.MessageEmbed()
        .setColor(client.config.colorEmbed)
        .setDescription(`Sayonara ${member.user.username}!\nSemoga kita nanti bisa bertemu lagi ya!`)
        .setImage(pat.url)

        // Send Embed
        channel.send({ embeds: [embed] })
    } catch (error) {
        return console.log(error);
    }
})