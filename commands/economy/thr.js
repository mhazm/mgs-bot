const { Client, Message, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const db = require('../../models/Thr');
const Guild = require('../../models/Guild');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'thr',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let now = new Date();
        let lebaran = moment.tz('2022-05-02 09:00', 'Asia/Jakarta');
        let lewatLebaran = moment.tz('2022-05-03 00:01', 'Asia/Jakarta');

        if (now < lebaran) {
            return message.reply({
                content: `Saat ini kamu belum bisa ambil THR\nKamu dapat ambil pada ${lebaran.format('dddd, Do MMMM YYYY - HH:mm zz')}`
            })
        };

        if (now > lewatLebaran) {
            return message.reply({
                content: `Yah kamu udah kelewatan gan! Udah gabisa claim lagi sekarang..\nClaim udah ditutup pada ${lewatLebaran.format('dddd, Do MMMM YYYY - HH:mm zz')}`
            })
        };

        let userData = await User.findOne({
            userID: message.author.id,
            guildID: message.guild.id,
        });
    
        if (!userData) return;
        if (message.author.bot) return;

        let guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        if (!guild) return;
        let budget = guild.eventbudget;

        const totalMessage = userData.message;
        if (totalMessage <= 200) {
            return message.reply({ content: `Jumlah message kamu kurang ah buat dikasih THR!\nKamu harus punya 200 message untuk claim.Sekarang kamu cuma punya ${totalMessage} message.`})
        };
        
        let formatDay = client.util.formatday(now);
        let formatBudget = client.util.currency(budget);

        let randomMoney = client.util.randomAngka(6500, 10000);

        if (budget < randomMoney) {
            return message.reply({ content: `Yah saldo adminnya abis men! Sisa saldonya tinggal ${formatBudget}`})
        };

        db.findOne({ guildID: message.guild.id, userID: message.author.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildID: message.guild.id,
                    userID: message.author.id,
                    date: now,
                    amount: randomMoney,
                    thr: true,
                });
            } else {
                return message.reply({
                    content: `Ah, maruk lu gan! Udah ngambil masa mau ngambil lagi!`
                });
            }
            data.save()
        });

        userData.money += randomMoney;
        userData.save();

        const formatMoney = client.util.currency(randomMoney);
        
        let e = new MessageEmbed()
            .setTitle(`🎁 Yeay THR!`)
            .setDescription(`Selamat ${message.author.username} mendapatkan THR senilai ${formatMoney}`)
            .addField('⏰ Claimed on', formatDay)
            .setColor("RANDOM")
            .setFooter({
                text: `Selamat hari raya idul fitri! Mohon maaf lahir dan batin!`,
                iconURL: message.guild.iconURL({ dynamic: true })
            });
        message.channel.send({ embeds: [e] });
    }
}