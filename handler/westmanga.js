const Discord = require('discord.js');
let axios = require('axios');
const client = require('../index');

class Westmanga {
    constructor(client) {
        this.client = client;
    }

    getSearch(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://westapi.herokuapp.com/api/search/${query}`);
                let data_search = get.data.manga_list;
                if (data_search.length < 1) return message.reply(`Pencarian dengan keyword **${query}** tidak ditemukan!`);

                //get endpoint
                let endpoint_search = [];
                data_search.forEach(a => {
                    endpoint_search.push(a.endpoint);
                });
                console.log(endpoint_search)

                //send title results
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle('Hasil Pencarian')
                    .setDescription(data_search.map((a, i) => `${i + 1}. ${a.title}`).join('\n'))
                let embed_search = await message.channel.send({ embeds: [embed] });
                let alert_search = await message.reply('pilih untuk melanjutkan!');

                let author = message.author;
                const filter = m => m.content.toLowerCase() && m.author.id === author.id
                const channel = message.channel

                const answer = channel.createMessageCollector({
                    filter,
                    max: 1,
                    time: 60_000,
                    errors: ['time']
                })

                answer.on('collect', m => {
                    console.log(m.content);
                    const search_index = m.content;
                    let result_search = endpoint_search[search_index - 1];
                    embed_search.delete();
                    alert_search.delete();
                    this.getDetail(result_search, message);
                });

                answer.on('end', m => {
                    if (m.size === 0) {
                        return message.reply('Kamu tidak memberikan respon.');
                    }
                })

                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }

    getDetail(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://westapi.herokuapp.com/api/manga/detail/${query}`);
                const linkbaca = get.data.manga_endpoint;

                const button = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Lihat ${get.data.type}`)
                    .setStyle('LINK')
                    .setURL(`${linkbaca}`)
                );

                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(client.util.truncate(get.data.title))
                    .setURL(get.data.manga_endpoint)
                    .setDescription(get.data.synopsis)
                    .setThumbnail(get.data.thumb)
                    .addField('📁 Type', `${get.data.type || `Unknown`}`, true)
                    .addField('⏳ Status', `${get.data.status || `Unknown`}`, true)
                    .addField('👤 Author', `${get.data.author || `Unknown`}`, true)
                    .addField('📆 Last Update', `${get.data.last_update || `Unknown`}`, true)
                    .addField('📖 Last Chapter', `${get.data.last_chapter || `Unknown`}`, true)
                    .addField('⭐ Rating', `${get.data.rating || `Unknown`}`, true)
                    .setFooter(`Kosuke © 2021, Westmanga`)
                await message.channel.send({
                    embeds: [embed],
                    components: [button],
                });
                
                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = Westmanga;