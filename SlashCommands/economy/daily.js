const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");
const User = require("../../models/User");
const moment = require('moment-timezone');
moment.locale('id');

module.exports = {
    name: "daily",
    description: "Mendapatkan uang dan point harian",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await User.findOne({
            guildID: interaction.guild.id,
            userID: interaction.user.id,
        });

        const guild = await Guild.findOne({
            guildID: interaction.guild.id,
        });

        if (!user) return;
        if (!guild) return;

        const now = new Date()

        // Cooldown Creator
        if (user.lastpayday) {
            const then = new Date(user.lastpayday)

            const diff = now.getTime() - then.getTime()
            const diffHours = Math.round(diff/ (1000 * 60 * 60))

            const hours = 24

            // Embed Notif
            let doneEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `Kamu hanya dapat melalukan daily selama ${hours} jam sekali.\nLast Daily : ${moment(user.lastpayday, "Asia/Jakarta").format('D MMMM YYYY, H:mm')}
                `)
            if (diffHours <= hours) {
                interaction.followUp({ embeds: [doneEmbed] })
                return;
            }
        }

        const rand = Math.floor(Math.random() * (100 - 0) + 0);
        const randMoney = Math.floor(Math.random() * (150 - 50) + 50);
        if (rand > 50) {
            user.point += 1;
            user.money += randMoney;
            user.lastpayday = now;

            let embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
                `${interaction.user.username} mendapatkan **1 Point** dan **Rp.${randMoney}** dari daily kamu hari ini.
            `)
            .setFooter({text: `Kamu dapat command daily kamu lagi dalam waktu 24 jam!`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
            interaction.followUp({ embeds: [embed] });

            // Send to modlog
            const modlog = client.channels.cache.get(guild.channel.modlog);
            let notifembed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`<:woow:819857034517676032> Member Daily!`)
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(
                    `**User:** ${interaction.user.username}
                    **UserID:** ${interaction.user.id}
                    **Get:** 1 Point and Rp.${randMoney}
                    They now have ${user.point} Point`)
                .setTimestamp()
            modlog.send({embeds : [notifembed]});
        } else if (rand < 50) {
            user.money += randMoney;
            user.lastpayday = now;

            let embed = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(
                `${interaction.user.username} mendapatkan **Rp.${randMoney}** dari daily kamu hari ini.
            `)
            .setFooter({text: `Kamu dapat command daily kamu lagi dalam waktu 24 jam!`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTimestamp()
            interaction.followUp({ embeds: [embed] });

            // Send to modlog
            const modlog = client.channels.cache.get(guild.channel.modlog);
            let notifembed = new MessageEmbed()
                .setColor("BLUE")
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`<:woow:819857034517676032> Member Daily!`)
                .setDescription(
                    `**User:** ${interaction.user.username}
                    **UserID:** ${interaction.user.id}
                    **Get:** Rp.${randMoney}`)
                .setTimestamp()
            modlog.send({embeds : [notifembed]});
        }
        user.save()
        return;
    },
};
