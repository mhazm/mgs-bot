const client = require('../index')
const CustomRole = require('../models/VIPRole.js');
const moment = require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const Guild = require('../models/Guild');
moment.locale('id');

client.on('guildMemberUpdate', async (member) => {

    if (member.bot) return;
    if (!member.guild) return;

    let data = await CustomRole.findOne({ userID: member.id, guildID: member.guild.id, });
    if (!data) return;

    let guildData = await Guild.findOne({
        guildID: member.guild.id,
    });
    if (!guildData) return;

    const role = member.guild.roles.cache.get(data.roleID);
        if (!role) {
            data.delete()
            return console.log(`[Error Found!] Role not exist again! return Deleted Data`);
        } 

    const vip = member.guild.roles.cache.get(guildData.role.vipRole);
        if (!vip) return console.log(`[Error Found] VIP Role not exist!`);

    const target = member.guild.members.cache.get(data.userID);
        if (!target) {
            role.delete({
                reason: 'Member not Found!',
            });
        data.delete()
        return console.log(`[Error Found!] Member not exist again! return Deleted Data`)
        }

    const guildname = member.guild.name;
    const guildicon = member.guild.iconURL();

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
