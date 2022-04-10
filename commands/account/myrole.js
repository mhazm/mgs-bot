const { Client, Message, MessageEmbed } = require('discord.js');
const CustomRole = require('../../models/CustomRole.js');
const Guild = require('../../models/Guild');
const moment = require('moment-timezone');

module.exports = {
    name: 'myrole',
    description: 'Melihat dan mengedit custom role',
    aliases: ["mr"],
    usage: '<args>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            moment.locale('id');
            let data = await CustomRole.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });
    
            if (!data) return message.reply(`Maaf, kamu ngga punya custom role. Jadi nggabisa pakai fitur ini`);
            const myRole = message.guild.roles.cache.find(r => r.id === data.roleID);
            const createdDate = moment.tz(data.createdDate, 'Asia/Jakarta').format('LLLL');

            let guild = await Guild.findOne({
                guildID: message.guild.id,
            });

            if (!guild) return;
    
            if(!args[0]) {
                let help = new MessageEmbed()
                .setColor(myRole.color)
                .setDescription(`
                Kamu dapat menggunakan command ini dengan contoh seperti ini : ${guild.prefix}set <args> dan nanti tinggal jawab saja pertanyaan dari dapin.\n
                Pilihan argumen yang tersedia adalah :
                <a:kanan:819853363179945994> **List Setting**
                • nama
                • warna
                • icon
                `)
                .addField('Role Name', `<@&${myRole.id}>`)
                .addField('Created Date', createdDate);
                return message.channel.send({ embeds: [help] })
            }


            if (args[0].toLowerCase() === 'nama') {
                message.reply('Apa nama baru role kamu?');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    if (finalanswer.length > 50 ) {
                        return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!');
                    }
    
                    myRole.edit({
                        name: finalanswer,
                    }).then(update => {
                        let embed = new MessageEmbed()
                            .setDescription(`<a:verified:962503696288215051> Berhasil mengubah nama role menjadi ${update.name}`)
                            .setTimestamp()
                            .setColor(client.config.berhasil)
                        message.channel.send({ embeds: [embed] });
                    })
                    
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'warna') {
                message.reply('Apa warna baru role kamu?');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    if (finalanswer.length > 50 ) {
                        return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!');
                    }
    
                    myRole.edit({
                        color: finalanswer,
                    }).then(update => {
                        let embed = new MessageEmbed()
                            .setDescription(`<a:verified:962503696288215051> Berhasil mengubah warna role <@&${update.id}>`)
                            .setTimestamp()
                            .setColor(client.config.berhasil)
                        message.channel.send({ embeds: [embed] });
                    })
                    
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'icon') {
                message.reply('Apa icon baru role kamu?');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    if (finalanswer.length > 100 ) {
                        return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!');
                    }
    
                    myRole.edit({
                        icon: finalanswer,
                    }).then(update => {
                        let embed = new MessageEmbed()
                            .setDescription(`<a:verified:962503696288215051> Berhasil mengubah icon role <@&${update.id}>`)
                            .setTimestamp()
                            .setColor(client.config.berhasil)
                        message.channel.send({ embeds: [embed] });
                    })
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            }
            
        } catch(error) {
            return console.log(error);
        }

    }
}