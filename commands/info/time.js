const { Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'timenow',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            moment.locale('id');
            let jamsekarang = moment().format('LT');
            let harisekarang = moment().format('LL');
            let waktulengkap = moment().format('LLLL');

            let embed = new MessageEmbed()
            .setTitle('Waktu Sekarang')
            .setDescription('Berikut ini adalah waktu saat ini')
            .addField('Jam Sekarang', jamsekarang, true)
            .addField('Tanggal Hari Ini', harisekarang, true)
            .addField('Waktu Lengkap', waktulengkap)
            message.channel.send({ embeds: [embed] })

        } catch (error) {
            return console.log(error);
        };
    }
}