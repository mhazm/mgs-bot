const Discord = require("discord.js");
const axios = require("axios");
const moment = require("moment");

class JadwalSholat {
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
                let get = await axios.get(`https://api.myquran.com/v1/sholat/kota/cari/${query}/`);
                let data_search = get.data.data;
                if (data_search.length < 1) return message.reply(`Pencarian dengan nama **${query}** tidak ditemukan!`);

                //get endpoint
                let endpoint_search = [];
                data_search.forEach(a => {
                    endpoint_search.push(a.id);
                });
                console.log(endpoint_search)

                //send title results
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle('Hasil Pencarian')
                    .setDescription(data_search.map((a, i) => `${i + 1}. ${a.lokasi}`).join('\n'))
                let embed_search = await message.channel.send({ embeds: [embed] });
                let alert_search = await message.reply('Silahkan ketik angkanya untuk melanjutkan!');

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
                moment.locale('id');
                const hariini = moment().format("YYYY/M/D");
                const timenow = moment().format('LLLL');
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://api.myquran.com/v1/sholat/jadwal/${query}/${hariini}`);

                let lokasi = get.data.data.lokasi;
                let daerah = get.data.data.daerah;
                
                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle('Jadwal Sholat Hari Ini')
                    .setDescription(`Berikut adalah Jadwal Sholat hari ini untuk wilayah ${lokasi}, ${daerah}`)
                    .addField('Imsak', `${get.data.data.jadwal.imsak || `Unknown`}`, true)
                    .addField('Subuh', `${get.data.data.jadwal.subuh || `Unknown`}`, true)
                    .addField('Dzuhur', `${get.data.data.jadwal.dzuhur || `Unknown`}`, true)
                    .addField('Ashar', `${get.data.data.jadwal.ashar || `Unknown`}`, true)
                    .addField('Maghrib', `${get.data.data.jadwal.maghrib || `Unknown`}`, true)
                    .addField('Isya', `${get.data.data.jadwal.isya || `Unknown`}`, true)
                    .addField('Waktu Saat ini', timenow)
                await message.channel.send({
                    embeds: [embed]
                })
                
                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = JadwalSholat;