const Discord = require("discord.js");
const User = require("../../models/User.js");
const Guild = require("../../models/Guild.js");
const moment = require("moment");

module.exports = {
    name: "profile",
    aliases: ['p'],
    category: "account",
    description: "Menampilkan Informasi User",
    usage: "[mention]",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user =
            message.mentions.users.first() ||
            message.author ||
            messsage.guild.members.cache.get(args[0]);

        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
        let joined = Math.floor(y / 86400000);

        const member = message.guild.members.cache.get(user.id);
        let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY");
        let avatar = user.avatarURL({ size: 4096 });

        if (member.bot) return message.channel.send("Its A Bot -_-");

        // Get UserDB Data
        let data = await User.findOne({
            guildID: message.guild.id,
            userID: member.id,
        });

        // Get UserData from Guild
        let guildData = await Guild.findOne({ guildID: message.guild.id });
          if (!data) return client.nodb(member.user);


        const color = data.rankcard.color;
        const level = data.level;
        const exp = process.env.UPXP;
        const lastupdate = moment.utc(data.lastProfileUpdate).format("dddd, MMMM Do YYYY");
        exprequired = Math.round(level * exp);
      
        let inline = true;
        let profile = new Discord.MessageEmbed()
            .setTitle(`${user.username} Profile`)
            .setDescription(`**Title : ** ${data.bio}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor(client.config.colorEmbed)
            .addField("💕 Beloved Waifu", `${data.waifu}`)
            .addField("🔰 Point", `${data.point || 0}`, true)
            .addField(
              "Tanggal Bergabung",
              `${joindate} \nSejak **${joined}** hari lalu`
            )
            .addField("💰 Money", `Rp. ${data.money || 0}`, inline)
            .addField("🛡️ Level", `${data.level || 1}`, inline)
            .addField("🏃‍♂️ XP", `${data.xp || 0}/${exprequired}`, inline)
            .addField("📧 Messages", `${data.messages || 0}`, inline)
            .addField("👮 Warn", `${data.warn || 0}/${process.env.WARN}`, inline)
            .addField("💤 Mute", `${data.muted || 0}/${process.env.WARN}`, inline)
            .addField("📖 Quest Done", `${data.questdone || 0} Quest`, inline)
            .setImage(`${data.banner}`)
            .addField(
              "📃 Custom Status",
              `${data.status || guildData.prefix + `setstatus [text]`}`
            );
          message.channel.send({ embeds: [profile] });
    },
};