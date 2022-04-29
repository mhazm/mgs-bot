const { Client, Message, MessageEmbed } = require('discord.js');
const Convert = require('../../models/Convert');
const User = require('../../models/User');
const Guild = require('../../models/Guild');
const math = require('mathjs');
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: 'payout',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const now = new Date();
        const formatDate = moment.tz(now, "Asia/Jakarta").format("LLLL");

        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        const tujuan = args[0];
        if (!tujuan) {
            return message.reply('Kamu harus mengisi tujuan pengiriman dulu, silahkan ketikan nama ewallet. ex: `gopay`');
        }

        let nomortujuan = args[1];
        if (!nomortujuan) {
            return message.reply('Kamu harus mengisi nomer tujuan pengiriman kamu.');
        }
        if (isNaN(nomortujuan)) {
            return message.reply('Kamu harus mengisi nomor tujuan dengan angka!');
        }
        if (nomortujuan.length < 11) {
            return message.reply('Yakin nih nomernya kurang dari 11 digit?');
        }
        if (nomortujuan.length > 13) {
            return message.reply('Yakin nih nomernya kurang dari 13 digit?');
        }
        
        let user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
       
        let guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        let guildTax = guild.tax;
        if (!guildTax) {
            guildTax = 5;
        }

        const nom = args[2];
        if (nom < 10000) {
            return message.reply('Payout minimum adalah Rp.10.000');
        }
        if (isNaN(nom)) {
            return message.reply('Nominal harus berupa angka!');
        }

        const tax = Math.floor(nom * (guildTax / 100));
        const nominal = math.sum(nom, tax);
        console.log(`Nominal : ${nom} | Tax: ${tax} | Total : ${nominal}`);

        const saldo = user.money;
        if (saldo < nominal) {
            let erEm = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Saldo kamu kurang untuk melakukan payout!\nSaldo kamu hanya **${formatter.format(saldo)}**`)
            .addField(`Request Payout`, formatter.format(nom), true)
            .addField(`Tax`, `${formatter.format(tax) || `5`} *(${guildTax}%)*`, true)
            .addField(`Required for Payout`, `${formatter.format(nominal) || `Error`}`)
            .setTimestamp()
            return message.channel.send({ embeds: [erEm] });
        }

        const budget = guild.budget;
        if (budget < nominal) {
            return message.reply(`Budget server saat ini tidak mencukupi. Budget saat ini hanya Rp.${guild.budget}`);
        }

        if (guild.active.convert === false) {
            return message.reply('Sorry bro, payout-system lagi ditutup sekarang...');
        }

        const convertCh = client.channels.cache.get(guild.channel.convert);
        if (!convertCh) {
            return message.reply(
                `Channel convert belum disetting, tolong contact admin untuk setting dengan cara ${guild.prefix}setch convert`
            );
        }

        try {
            if (tujuan.toLowerCase() === "pulsa") {
                let embednotif = new MessageEmbed()
                    .setTitle(`<:bmoney:836506631063470090> ${message.author.username} New Convert`)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("GREEN")
                    .addField("Username", `<@${message.author.id}>`)
                    .addField("Tujuan", tujuan, true)
                    .addField("Nomor Tujuan", nomortujuan, true)
                    .addField("Nominal", `${formatter.format(nom) || `Error`}`, true)
                    .addField("Tanggal", formatDate)
                    .addField("Status", "On Waiting List")
                    .setTimestamp();
                convertCh.send({ embeds: [embednotif] });

                let userNotif = new MessageEmbed()
                    .setTitle(`<:bmoney:836506631063470090> Ticket request Payout di ${message.member.guild.name}`)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor("RED")
                    .setDescription("Request kamu telah terkirimkan dan akan diproses paling lambat 2x24 jam dari sekarang./nTerimakasih!")
                    .addField("Username", message.author.username)
                    .addField("Tujuan", tujuan, true)
                    .addField("Nomor Tujuan", nomortujuan, true)
                    .addField("Nominal", `${formatter.format(nom) || `Error`}`, true)
                    .addField("Tanggal", formatDate)
                    .addField("Status", "On Waiting List")
                    .setTimestamp();
                message.author.send({ embeds: [userNotif] });

                user.money -= nominal;
                guild.budget -= nom;
                user.save();
                guild.save();
                message.reply(`Penukaran telah berhasil!\nSaldo kamu saat ini Rp.${user.money}`);
            } else if (tujuan.toLowerCase() === "gopay" || "ovo" || "dana" || "shopeepay") {
                let embednotif = new MessageEmbed()
                    .setTitle(`<:bmoney:836506631063470090> ${message.author.username} New Convert`)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("GREEN")
                    .addField("Username", `<@${message.author.id}>`)
                    .addField("Tujuan", tujuan, true)
                    .addField("Nomor Tujuan", nomortujuan, true)
                    .addField("Nominal", `${formatter.format(nom) || `Error`}`, true)
                    .addField("Tanggal", formatDate)
                    .addField("Status", "On Waiting List")
                    .setTimestamp();
                convertCh.send({ embeds: [embednotif] });

                let userNotif = new MessageEmbed()
                    .setTitle(`<:bmoney:836506631063470090> Ticket request Payout di ${message.member.guild.name}`)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor("RED")
                    .setDescription("Request kamu telah terkirimkan dan akan diproses paling lambat 2x24 jam dari sekarang./nTerimakasih!")
                    .addField("Username", message.author.username)
                    .addField("Tujuan", tujuan, true)
                    .addField("Nomor Tujuan", nomortujuan, true)
                    .addField("Nominal", `${formatter.format(nom) || `Error`}`, true)
                    .addField("Tanggal", formatDate)
                    .addField("Status", "On Waiting List")
                    .setTimestamp();
                message.author.send({ embeds: [userNotif] });

                user.money -= nominal;
                guild.budget -= nom;
                user.save();
                guild.save();
                message.reply(`Penukaran telah berhasil!\nSaldo kamu saat ini Rp.${user.money}`);
            }

            Convert.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new Convert({
                        guildID: message.guild.id,
                        userID: message.author.id,
                        convertdata: [
                            {
                                tujuan: tujuan,
                                nomor: nomortujuan,
                                nominal: nom,
                                tanggal: now,
                                status: "Pending",
                            },
                        ],
                    });
                } else {
                    const obj = {
                        tujuan: tujuan,
                        nomor: nomortujuan,
                        nominal: nom,
                        tanggal: now,
                        status: "Pending",
                    };
                    data.convertdata.push(obj);
                }
                data.save();
            });
        } catch {
            return console.log(err);
        }
    }
}