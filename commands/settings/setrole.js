const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require('../../models/Guild.js');

module.exports = {
    name: 'setrole',
    descrption: 'Melakukan settingan role bot',
    usage: '<args> <mention role>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            let data = await Guild.findOne({
                guildID: message.guild.id
            });
    
            // Get modlog Channel
            const modlog = client.channels.cache.get(data.channel.modlog);
            if (!modlog) return;

            if(!args[0]) {
                let err = new MessageEmbed()
                    .setDescription('Kamu harus menggunakan arguments untuk mensetting role.\nContoh: !setrole <args> <mention role>\n\nList Argument bisa dilihat dibawah ini')
                    .addField('List Agruments', '1. vip\n2. warn1\n3. warn2\n4. warn3\n5. warn4 \n6. admin\n7. mod\n8.mute')
                    .setColor(client.config.warning)
                return message.channel.send({ embeds: [err] }).then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                });
            }

            if (args[0].toLowerCase() === 'vip') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.vipRole = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'warn1') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.warn1 = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'warn2') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.warn2 = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'warn3') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.warn3 = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'warn4') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.warn4 = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'mute') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.mutedRole = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'admin') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.adminRole = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'mod') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.modRole = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });

            } else if (args[0].toLowerCase() === 'pos') {
                let role =  message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[1]);
                if(!role) return message.channel.send("Tolong di tag dulu rolenya!");
                let embed = new MessageEmbed()
                    .setDescription(`Berhasil setting role ${args[0]} menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                message.channel.send({ embeds: [embed] });
                data.role.upCrRole = role.id; data.save();
    
                // Send Report to ModLog
                let report = new MessageEmbed()
                    .setDescription(`User **${message.author.username}** mengubah ${args[0]} role menjadi <@&${role.id}>`)
                    .setTimestamp()
                    .setColor(client.config.berhasil)
                modlog.send({ embeds: [report] });
            }

        } catch (error) {
            return console.log(error);
        }
    }
}