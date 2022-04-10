const client = require('../index')
const CustomRole = require('../models/CustomRole.js');
const moment = require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const Guild = require('../models/Guild');
moment.locale('id');

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    let data = await CustomRole.findOne({ userID: message.author.id, guildID: message.guild.id, });
    if (!data) return;

    let guildData = await Guild.findOne({
        guildID: message.guild.id,
    });
    if (!guildData) return;

    const role = message.guild.roles.cache.get(data.roleID);
        if (!role) {
            data.delete()
            return console.log(`[Error Found!] Role not exist again! return Deleted Data`);
        } 

    const vip = message.guild.roles.cache.get(guildData.role.vipRole);
        if (!vip) return console.log(`[Error Found] VIP Role not exist!`);

    const target = message.guild.members.cache.get(data.userID);
        if (!target) {
            role.delete({
                reason: 'Member not Found!',
            });
        data.delete()
        return console.log(`[Error Found!] Member not exist again! return Deleted Data`)
        }

    const guildname = message.member.guild.name;
    const guildicon = message.guild.iconURL();

    let embedNotif = new MessageEmbed()
        .setTitle('❌ Role Deleted')
        .setColor(client.config.warning)
        .setThumbnail(guildicon)
        .setDescription(`Custom role kamu di ${guildname} dihapus hari ini ${moment.tz(data.expired, 'Asia/Jakarta').format('LLLL')}, karena kamu telah kehilangan role ${vip.name}`)
        .addField('Role Name', role.name)
        .setTimestamp()

    if (!target.roles.cache.has(vip.id)) {
            target.send({ embeds: [embedNotif] });
            target.roles.remove(role.id);
            role.delete({
                reason: 'Member not Found!',
            });
            data.delete();
            return console.log('[Deleted Data from Role DB] Reason: Expired timed role]');
        }
});
