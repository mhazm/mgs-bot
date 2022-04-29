const { Client, Message } = require('discord.js');
const canvacord = require('canvacord');
const User = require('../../models/User');

module.exports = {
    name: 'exp',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author || message.guild.members.cache.get(args[0]);

        const member = message.guild.members.cache.get(user.id);

        let userData = await User.findOne({
            guildID: message.guild.id,
            userID: member.id,
        });
        if (!userData) return;

        let avatar = user.avatarURL({ dynamic: false, format: 'png' });

        const level = userData.level;
        const upXp = process.env.UPXP;
        const nextLevel = Math.round(level * upXp);

        const rank = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(userData.xp, `#${userData.rankcard.color || `FFFFFF`}`)
        .setRequiredXP(nextLevel, `#${userData.rankcard.color || `FFFFFF`}`)
        .setLevel(level)
        .setProgressBar(`#${userData.rankcard.color || `FFFFFF`}`)
        .setLevelColor('TEXT', `#${userData.rankcard.color || `FFFFFF`}`)
        .setBackground('IMAGE', `${userData.rankcard.background}`)
        .setUsername(user.username, `#${userData.rankcard.color || `FFFFFF`}`)
        .setRank(1, "RANK", false)
        .registerFonts()
        .setDiscriminator(user.discriminator, `#${userData.rankcard.color || `FFFFFF`}`);

        message.channel.send({
            files: [await rank.build()]
        })

    }
}