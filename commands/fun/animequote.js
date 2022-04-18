const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require("axios");

module.exports = {
    name: 'animequote',
    aliases: ["animequotes", "quoteanime", "quotesanime"],
    category: "Fun",
    description: "Menampilkan random quotes dari karakter anime",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.delete();
        let get = await axios.get(`https://katanime.vercel.app/api/getrandom`);
        let data = get.data.result[0];

        let embed = new MessageEmbed()
        .setTitle(`:book: Anime Quotes`)
        .setDescription(`
        "${data.indo || `[Error loading data!]`}"
        — ${data.character} dari anime ${data.anime}`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter({ text: `Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        let embedSend = await message.channel.send({ embeds: [embed] });
        await embedSend.react(`<:boooo:819857028578934814>`)
        await embedSend.react(`<a:dokidoki:819854461912481794>`)
        await embedSend.react(`<:ina_approve:845759394641477693>`)
    }
}