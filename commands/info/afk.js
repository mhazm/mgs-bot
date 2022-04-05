const { Message } = require('discord.js');
const db = require("quick.db");
const Guild = require("../../models/Guild");

module.exports = {
    name: 'afk',
    description: 'Membuat status afk',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            // Check typing on AFK Channel
            let data = await Guild.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });

            let afkchannel = data.channel.afk;
            if (!afkchannel) return;

            let thisChannel = message.channel.id;
            if (thisChannel !== afkchannel) {
                return message.reply(`Kamu dapat menggunakan command ini di <#${afkchannel}>`)
            };

            // LET AFK
            const status = new db.table('AFKs');
            let afk = await status.fetch(`userid_${message.author.id}_guild_${message.guild.id}`);

            //ignore AFK
            let reason = args.join(' ').toString();

            if (!afk) {
                message.delete()
                message.channel.send(`**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, { disableMentions: 'all' });
                setTimeout(() => {
                    status.set(`userid_${message.author.id}_guild_${message.guild.id}`, { alasan: reason || 'AFK' });
                    status.add(`userid_${message.author.id}_guild_${message.guild.id}.time`, Date.now());
                }, 7000);

            } else {
                status.delete(`userid_${message.author.id}_guild_${message.guild.id}`);
            };

        } catch (error) {
            return message.channel.send({ content: `Something went wrong: ${error.message}` });
            // Restart the bot
        };
    }
}