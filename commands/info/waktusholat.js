const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'waktusholat',
    description: 'Menampilkan waktu sholat sesuai daerah',
    aliases: ["ws", "jadwalsholat", "js"],
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let query = args.join(' ');
            if (!query) return message.reply('Kamu harus memasukan nama kota terlebih dahulu!').then(msg => {
                setTimeout(() => msg.delete(), 3000)
              });

            await client.jadwalsholat.getSearch(query, message);
        } catch (error) {
            return console.log(error);
        }
    }
}