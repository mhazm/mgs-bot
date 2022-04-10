const client = require('../index')
const Role = require('../models/Role.js');
const moment = require('moment-timezone');
const { MessageEmbed } = require('discord.js');
moment.locale('id');

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    let data = await Role.findOne({ userID: message.author.id, guildID: message.guild.id, expired: {$lt: new Date()} });

    if (!data) return;
    
    console.log(`User Found!`);
    const role = message.guild.roles.cache.get(data.roleID);
        if (!role) return console.log(`[Error Found!] Role not exist again!`);

    const target = message.guild.members.cache.get(data.userID);
        if (!target) return console.log(`[Error Found] Member not exist!`);

    const guildname = message.member.guild.name;
    const guildicon = message.guild.iconURL();

    let embedNotif = new MessageEmbed()
        .setTitle('❌ Role Expired')
        .setColor("RANDOM")
        .setThumbnail(guildicon)
        .setDescription(`Temporary Role kamu telah expired hari ini\n${moment.tz(data.expired, 'Asia/Jakarta').format('LLLL')}`)
        .addField('Role Name', role.name)
        .addField('Guild Name', guildname)
        .setTimestamp()

    if (target.roles.cache.has(role.id)) {
            target.send({ embeds: [embedNotif] });
            target.roles.remove(role.id);
            data.delete();
            return console.log('[Deleted Data from Role DB] Reason: Expired timed role]');
    } else if (!target.roles.cache.has(role.id)) {
        data.delete()
        return console.log('[Deleted Data from Role DB] Reason: Expired timed role]');
    };
    
});
