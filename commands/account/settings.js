const { Message, MessageEmbed, Channel, Collector } = require('discord.js');
const User = require('../../models/User.js');

module.exports = {
    name: "settings",
    aliases: ["set"],
    category: "account",
    description: "Mengubah/Mengatur Profile",
    usage: "[args] [settingan]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            let data = await User.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });
    
            if (!data) return;
    
            if(!args[0]) {
                let help = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`
                Kamu dapat menggunakan command ini dengan contoh seperti ini : set <args> dan nanti tinggal jawab saja pertanyaan dari dapin.\n
                Pilihan argumen yang tersedia adalah :
                <a:kanan:819853363179945994> **Setting Profile**
                • title
                • waifu
                • banner
                • warna
                
                <a:kanan:819853363179945994> **Setting Game Profile**
                • genshin
                • valo
                • steam
                • pb
                • osu
                • pubg
                • rockstar
                • ml
                • honkai
                • apex
                
                <a:kanan:819853363179945994> **Setting Social Media**
                • fb
                • twitter
                • ig
                • tiktok
                
                Gunakan seperti ***!set title***`);
                return message.channel.send({ embeds: [help] })
            }
    
            if (args[0].toLowerCase() === 'title') {
                message.reply('Apa nama title yang mau kamu pasang?');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    if (finalanswer.length > 100 ) {
                        return message.reply('Nama title kamu lebih dari 100 karakter cuy!');
                    }
    
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting title menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.waifu = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'waifu') {
                message.reply('Tolong sebutkan nama waifumu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting title menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.waifu = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'genshin') {
                message.reply('Tolong sebutkan UserID Genshin Impact kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting Genshin Impact ID menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.genshin = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'steam') {
                message.reply('Tolong sebutkan steam username kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting Steam Username menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.steamId = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'ml') {
                message.reply('Tolong sebutkan Mobile Legend ID kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting Mobile Legend ID menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.mobileLegends = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'osu') {
                message.reply('Tolong sebutkan username osu kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username osu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.osu = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'honkai') {
                message.reply('Tolong sebutkan userID Honkai kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting ID Honkai Impact menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.honkaiImpact = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'rockstar') {
                message.reply('Tolong sebutkan username/RID kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting Rockstar ID menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.RockstarGames = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'valo') {
                message.reply('Tolong sebutkan username valorant kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username valorant menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.Valorant = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'apex') {
                message.reply('Tolong sebutkan username apex kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username apex legends menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.ApexLegend = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'pb') {
                message.reply('Tolong sebutkan username pointblank kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username pointblank menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.PointBlank = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'pubg') {
                message.reply('Tolong sebutkan username PUBG kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username PUBG menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.PUBG = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'fb') {
                message.reply('Tolong sebutkan username facebook kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username facebook menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.facebook = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'twitter') {
                message.reply('Tolong sebutkan username twitter kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username twitter menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.twitter = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'ig') {
                message.reply('Tolong sebutkan username instagram kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username instagram menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.instagram = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'tiktok') {
                message.reply('Tolong sebutkan username tiktok kamu..');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting username tiktok menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.tiktok = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'gamestatus') {
                message.reply('Tolong sebutkan status yang mau kamu pasang');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting gamestatus kamu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.games.gamestatus = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'sosmedstatus') {
                message.reply('Tolong sebutkan status yang mau kamu pasang');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting profile social media status kamu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.sosmedStatus = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'help') {
                message.reply('Tolong sebutkan status yang mau kamu pasang');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting profile social media status kamu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.socialMedia.sosmedStatus = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'banner') {
                message.reply('Tolong taruh link/url yang berisikan gambar!');
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting profile social media status kamu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.banner = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            } else if (args[0].toLowerCase() === 'warna') {
                message.reply(`
                Tolong taruh hex code warna, **tanpa tanda #**
                Contoh: FFFFFF`);
                
                const filter = m => m.content && m.author.id === message.author.id;
                channel = message.channel;
    
                const answer = channel.createMessageCollector({ filter, max: 1, time: 30_000, errors:['time'] })
                
                answer.on('collect', m => {
                    const finalanswer = m.content;
                    let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting profile social media status kamu menjadi ${finalanswer}`)
                    .setTimestamp(new Date())
                    .setColor(client.config.berhasil)
                    message.channel.send({ embeds: [embed] });
                    data.rankcard.color = finalanswer; data.save();
                });
                
                answer.on('end', m => {
                    if (m.size === 0) {
                        message.reply('Kamu tidak memberikan jawaban.');
                    }               
                })
            }
            
        } catch (err) {
            return console.log(err);
        }
    }
}