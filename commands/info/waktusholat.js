const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'waktusholat',
    aliases: ["ws", "jadwalsholat", "js"],
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let query = args.join(' ');
            if (!query) return message.reply('Kamu harus memasukan nama kota terlebih dahulu!');

            await client.jadwalsholat.getSearch(query, message);
        } catch (error) {
            return console.log(error);
        }
    }
}