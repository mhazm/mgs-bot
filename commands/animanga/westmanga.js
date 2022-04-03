const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "westmanga",
    aliases: ["wm"],
    category: "animanga",
    description: "Mencari dan menampilkan informasi manga dari westmanga",
    usage: "",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let query = args.join(' ');
            if (!query) return message.reply('Kamu harus memasukan nama kota terlebih dahulu!');

            await client.westmanga.getSearch(query, message);
        } catch (err) {
            return console.log(err)
        };
    }
}