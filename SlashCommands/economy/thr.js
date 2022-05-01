const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const User = require('../../models/User')
const db = require('../../models/Thr');
const Guild = require('../../models/Guild');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: "thr",
    description: "Ambil uang THR lebaran",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let now = new Date();
        let lebaran = moment.tz('2022-05-02 09:00', 'Asia/Jakarta');

        if (now < lebaran) {
            return interaction.followUp({
                content: `Saat ini kamu belum bisa ambil THR\nKamu dapat ambil pada ${lebaran.format('dddd, Do MMMM YYYY - HH:mm zz')}`
            })
        };

        let userData = await User.findOne({
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        });
    
        if (!userData) return;
        if (interaction.user.bot) return;

        let guild = await Guild.findOne({
            guildID: interaction.guild.id,
        });

        if (!guild) return;
        let budget = guild.eventbudget;
        let formatBudget = client.util.currency(budget);

        const totalMessage = userData.message;
        if (totalMessage <= 200) {
            return interaction.followUp({ content: `Jumlah message kamu kurang ah buat dikasih THR!\nKamu harus punya 200 message untuk claim.Sekarang kamu cuma punya ${totalMessage} message.`})
        };

        let formatDay = client.util.formatday(now);

        let randomMoney = client.util.randomAngka(6500, 10000);

        if (budget < randomMoney) {
            return interaction.followUp({ content: `Yah saldo adminnya abis men! Sisa saldonya tinggal ${formatBudget}`})
        };

        db.findOne({ guildID: interaction.guild.id, userID: interaction.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildID: interaction.guild.id,
                    userID: interaction.user.id,
                    date: now,
                    amount: randomMoney,
                    thr: true,
                });
            } else {
                return interaction.followUp({
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
            .setDescription(`Selamat ${interaction.user.username} mendapatkan THR senilai ${formatMoney}`)
            .addField('⏰ Claimed on', formatDay)
            .setColor("RANDOM")
            .setFooter({
                text: `Selamat hari raya idul fitri! Mohon maaf lahir dan batin!`,
                iconURL: interaction.guild.iconURL({ dynamic: true })
            });
        interaction.followUp({ embeds: [e] });
    },
};
