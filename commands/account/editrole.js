const { Client, Message, MessageEmbed } = require('discord.js');
const CustomRole = require('../../models/CustomRole.js');
const VIPRole = require('../../models/VIPRole.js');
const Guild = require('../../models/Guild');
const moment = require('moment-timezone');

module.exports = {
    name: 'editrole',
    description: 'Melihat dan mengedit custom role',
    aliases: ["er"],
    usage: '<args>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            moment.locale('id');
            const guildicon = message.guild.iconURL({ dynamic: true });

            if (!args[0]) {
                message.reply(`Silahkan dipilih dulu role custom typing / vip`);
            }

            if (args[0] === 'typing') {
                let data = await CustomRole.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id,
                });

                if (!data) return message.reply(`Maaf, kamu ngga punya custom role. Jadi nggabisa pakai fitur ini`).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });

                const myRole = message.guild.roles.cache.find(r => r.id === data.roleID);
                const createdDate = moment.tz(data.createdDate, 'Asia/Jakarta').format('LLLL');

                let guild = await Guild.findOne({
                    guildID: message.guild.id,
                });

                if (!guild) return;

                let icon = myRole.iconURL()
                    if (!icon) {
                    icon = guildicon;
                    }
        
                if(!args[1]) {                
                    let help = new MessageEmbed()
                    .setColor(myRole.color)
                    .setDescription(`
                    Kamu dapat menggunakan command ini dengan contoh seperti ini : ${guild.prefix}mr typing <args> dan nanti tinggal jawab saja pertanyaan dari dapin.\n
                    Pilihan argumen yang tersedia adalah :
                    <a:kanan:819853363179945994> **List Setting**
                    • nama
                    • warna
                    • icon
                    `)
                    .addField('Role Name', `<@&${myRole.id}>`)
                    .addField('Created Date', createdDate)
                    .setThumbnail(icon);
                    return message.channel.send({ embeds: [help] })
                }


                if (args[1].toLowerCase() === 'nama') {
                    message.reply('Apa nama baru role kamu?').then(msg => {
                        setTimeout(() => msg.delete(), 30_000)
                    });;
                    
                    const filter = m => m.content && m.author.id === message.author.id;
                    channel = message.channel;
        
                    const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                    
                    answer.on('collect', m => {
                        const finalanswer = m.content;
                        if (finalanswer.length > 50 ) {
                            return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!').then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        }
        
                        myRole.edit({
                            name: finalanswer,
                        }).then(update => {
                            let embed = new MessageEmbed()
                                .setDescription(`<a:verified:962503696288215051> Berhasil mengubah nama role menjadi ${update.name}`)
                                .setTimestamp()
                                .setColor(client.config.berhasil)
                            message.channel.send({ embeds: [embed] }).then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        })
                        
                    });
                    
                    answer.on('end', m => {
                        if (m.size === 0) {
                            message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        }               
                    })

                    } else if (args[1].toLowerCase() === 'warna') {
                        message.reply('Apa warna baru role kamu?').then(msg => {
                            setTimeout(() => msg.delete(), 30_000)
                        });
                        
                        const filter = m => m.content && m.author.id === message.author.id;
                        channel = message.channel;
            
                        const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                        
                        answer.on('collect', m => {
                            const finalanswer = m.content;
                            if (finalanswer.length > 50 ) {
                                return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }
            
                            myRole.edit({
                                color: finalanswer,
                            }).then(update => {
                                let embed = new MessageEmbed()
                                    .setDescription(`<a:verified:962503696288215051> Berhasil mengubah warna role <@&${update.id}>`)
                                    .setTimestamp()
                                    .setColor(update.color)
                                message.channel.send({ embeds: [embed] }).then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            })
                            
                        });
                        
                        answer.on('end', m => {
                            if (m.size === 0) {
                                message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }               
                        })
                    } else if (args[1].toLowerCase() === 'icon') {
                        message.reply('Apa icon baru role kamu?').then(msg => {
                            setTimeout(() => msg.delete(), 30_000)
                        });
                        
                        const filter = m => m.attachments && m.author.id === message.author.id;
                        channel = message.channel;
            
                        const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                        
                        answer.on('collect', m => {
                            if (m.attachments.size > 0) {
                                console.log(m.attachments.first().url)
                                let attachmentUrl = m.attachments.first().url;

                                myRole.edit({
                                    icon: attachmentUrl,
                                }).then(update => {
                                    let embed = new MessageEmbed()
                                        .setDescription(`<a:verified:962503696288215051> Berhasil mengubah icon role <@&${update.id}>`)
                                        .setTimestamp()
                                        .setColor(client.config.berhasil)
                                        .setImage(attachmentUrl)
                                    return message.channel.send({ embeds: [embed] });
                                })  
                            }
                            else 
                            if (!m.content.startsWith('https://' || `http://`)) {
                                return message.reply('Tolong bro, masukin url! bukannya malah curhat..');
                            } else 
                            if (m.content.startsWith('https://' || `http://`)) {   
                                myRole.edit({
                                    icon: m.content,
                                }).then(update => {
                                    let embed = new MessageEmbed()
                                        .setDescription(`<a:verified:962503696288215051> Berhasil mengubah icon role <@&${update.id}>`)
                                        .setTimestamp()
                                        .setColor(client.config.berhasil)
                                        .setImage(m.content)
                                    return message.channel.send({ embeds: [embed] });
                                })
                            }
                        });
                        
                        answer.on('end', m => {
                            if (m.size === 0) {
                                message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }               
                        })
                    } else if (args[1].toLowerCase() === 'info') {
                        let roleID = data.roleID;
                        let memberWithRole = message.guild.roles.cache.get(roleID);
                        
                        let embedMyRole = new MessageEmbed()
                            .setTitle(`${myRole.name} Information`)
                            .setThumbnail(icon)
                            .setColor(myRole.color)
                            .addField(`Owner`, `<@${data.userID}>`)
                            .addField(`Created Date`, createdDate)
                            .addField(`Size Member`, `${memberWithRole.members.size} User`)
                            .addField(`Member in Role`, `${memberWithRole.members.map((a) =>  `<@${a.user.id}>`).join('\n')}`)
                            .setTimestamp()
                        message.channel.send({ embeds: [embedMyRole] });
                    }
            } else if (args[0] === 'vip') {
                let data = await VIPRole.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id,
                });

                if (!data) return message.reply(`Maaf, kamu ngga punya custom role. Jadi nggabisa pakai fitur ini`).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });

                const myRole = message.guild.roles.cache.find(r => r.id === data.roleID);
                const createdDate = moment.tz(data.createdDate, 'Asia/Jakarta').format('LLLL');

                let guild = await Guild.findOne({
                    guildID: message.guild.id,
                });

                if (!guild) return;

                let icon = myRole.iconURL()
                    if (!icon) {
                    icon = guildicon;
                    }
        
                if(!args[1]) {                
                    let help = new MessageEmbed()
                    .setColor(myRole.color)
                    .setDescription(`
                    Kamu dapat menggunakan command ini dengan contoh seperti ini : ${guild.prefix}mr vip <args> dan nanti tinggal jawab saja pertanyaan dari dapin.\n
                    Pilihan argumen yang tersedia adalah :
                    <a:kanan:819853363179945994> **List Setting**
                    • nama
                    • warna
                    • icon
                    `)
                    .addField('Role Name', `<@&${myRole.id}>`)
                    .addField('Created Date', createdDate)
                    .setThumbnail(icon);
                    return message.channel.send({ embeds: [help] })
                }


                if (args[1].toLowerCase() === 'nama') {
                    message.reply('Apa nama baru role kamu?').then(msg => {
                        setTimeout(() => msg.delete(), 30_000)
                    });;
                    
                    const filter = m => m.content && m.author.id === message.author.id;
                    channel = message.channel;
        
                    const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                    
                    answer.on('collect', m => {
                        const finalanswer = m.content;
                        if (finalanswer.length > 50 ) {
                            return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!').then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        }
        
                        myRole.edit({
                            name: finalanswer,
                        }).then(update => {
                            let embed = new MessageEmbed()
                                .setDescription(`<a:verified:962503696288215051> Berhasil mengubah nama role menjadi ${update.name}`)
                                .setTimestamp()
                                .setColor(client.config.berhasil)
                            message.channel.send({ embeds: [embed] }).then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        })
                        
                    });
                    
                    answer.on('end', m => {
                        if (m.size === 0) {
                            message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            });
                        }               
                    })

                    } else if (args[1].toLowerCase() === 'warna') {
                        message.reply('Apa warna baru role kamu?').then(msg => {
                            setTimeout(() => msg.delete(), 30_000)
                        });
                        
                        const filter = m => m.content && m.author.id === message.author.id;
                        channel = message.channel;
            
                        const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                        
                        answer.on('collect', m => {
                            const finalanswer = m.content;
                            if (finalanswer.length > 50 ) {
                                return message.reply('Nama Role kamu tidak boleh lebih dari 50 karakter!').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }
            
                            myRole.edit({
                                color: finalanswer,
                            }).then(update => {
                                let embed = new MessageEmbed()
                                    .setDescription(`<a:verified:962503696288215051> Berhasil mengubah warna role <@&${update.id}>`)
                                    .setTimestamp()
                                    .setColor(update.color)
                                message.channel.send({ embeds: [embed] }).then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            })
                            
                        });
                        
                        answer.on('end', m => {
                            if (m.size === 0) {
                                message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }               
                        })
                    } else if (args[1].toLowerCase() === 'icon') {
                        message.reply('Apa icon baru role kamu?').then(msg => {
                            setTimeout(() => msg.delete(), 30_000)
                        });
                        
                        const filter = m => m.attachments && m.author.id === message.author.id;
                        channel = message.channel;
            
                        const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                        
                        answer.on('collect', m => {
                            if (m.attachments.size > 0) {
                                console.log(m.attachments.first().url)
                                let attachmentUrl = m.attachments.first().url;

                                myRole.edit({
                                    icon: attachmentUrl,
                                }).then(update => {
                                    let embed = new MessageEmbed()
                                        .setDescription(`<a:verified:962503696288215051> Berhasil mengubah icon role <@&${update.id}>`)
                                        .setTimestamp()
                                        .setColor(client.config.berhasil)
                                        .setImage(attachmentUrl)
                                    return message.channel.send({ embeds: [embed] });
                                })  
                            }
                            else 
                            if (!m.content.startsWith('https://' || `http://`)) {
                                return message.reply('Tolong bro, masukin url! bukannya malah curhat..');
                            } else 
                            if (m.content.startsWith('https://' || `http://`)) {   
                                myRole.edit({
                                    icon: m.content,
                                }).then(update => {
                                    let embed = new MessageEmbed()
                                        .setDescription(`<a:verified:962503696288215051> Berhasil mengubah icon role <@&${update.id}>`)
                                        .setTimestamp()
                                        .setColor(client.config.berhasil)
                                        .setImage(m.content)
                                    return message.channel.send({ embeds: [embed] });
                                })
                            }
                        });
                        
                        answer.on('end', m => {
                            if (m.size === 0) {
                                message.reply('Kamu tidak memberikan jawaban.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                });
                            }               
                        })
                    } else if (args[1].toLowerCase() === 'info') {
                        let roleID = data.roleID;
                        let memberWithRole = message.guild.roles.cache.get(roleID);
                        
                        let embedMyRole = new MessageEmbed()
                            .setTitle(`${myRole.name} Information`)
                            .setThumbnail(icon)
                            .setColor(myRole.color)
                            .addField(`Owner`, `<@${data.userID}>`)
                            .addField(`Created Date`, createdDate)
                            .addField(`Size Member`, `${memberWithRole.members.size} User`)
                            .addField(`Member in Role`, `${memberWithRole.members.map((a) =>  `<@${a.user.id}>`).join('\n')}`)
                            .setTimestamp()
                        message.channel.send({ embeds: [embedMyRole] });
                    }
            }
        } catch(error) {
            return console.log(error);
        }

    }
}