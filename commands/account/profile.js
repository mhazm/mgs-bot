const Discord = require("discord.js");
const User = require("../../models/User.js");
const Guild = require("../../models/Guild.js");
const moment = require("moment");

module.exports = {
  name: "profile",
  aliases: ["p"],
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
      message.mentions.members.first() ||
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
	const inline = true;
    const level = data.level;
    const exp = process.env.UPXP;
    const lastupdate = moment
      .utc(data.lastProfileUpdate)
      .format("dddd, MMMM Do YYYY");
    exprequired = Math.round(level * exp);

    //Profile Button
    const pbutton = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Game Profile")
        .setStyle("SUCCESS")
        .setCustomId("game"),

      new Discord.MessageButton()
        .setLabel("Social Media")
        .setStyle("SECONDARY")
        .setCustomId("sosmed")
    );

    // Game Profile
    const gameProfile = new Discord.MessageEmbed()
      .setTitle(`${data.account.username} Game Profile`)
      .setDescription(data.games.gamestatus)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor(`#${color}`)
      .addField(`<:genshin_impact:959959227978367036> Genshin Impact`, `${data.games.genshin || 0}`, inline)
      .addField(`<:steam:959960716645912626> Steam ID`, `${data.games.steamId || 0}`, inline)
      .addField(`<:mlbb:959959223805042708> Mobile Legends`, `${data.games.mobileLegends || 0}`, inline)
      .addField(`<:osu:959959229769330698> Osu!`, `${data.games.osu || 0}`, inline)
      .addField(`<:hi3:959960324038082580> Honkai Impact`, `${data.games.honkaiImpact || 0}`, inline)
      .addField(`<:rockstar:959960136703696916> RockstarGames`, `${data.games.RockstarGames || 0}`, inline)
      .addField(`<:valorant:959959222316044318> Valorant`, `${data.games.Valorant || 0}`, inline)
      .addField(`<:apex_legends:918509699459080293> Apex Legends`, `${data.games.ApexLegend || 0}`, inline)
      .addField(`<:pointblank:959959227726692413> PointBlank`, `${data.games.PointBlank || 0}`, inline)
      .addField(`<:pubg:959962356631371796> PUBG`, `${data.games.PUBG || 0}`, inline)
      .setImage(`${data.banner}`);

    // Social Media Profile
    const socialMedia = new Discord.MessageEmbed()
      .setTitle(`${data.account.username} Social Media`)
      .setDescription(data.socialMedia.sosmedStatus)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor(`#${color}`)
      .addField(`<:facebook:959963320402706443> Facebook`, `${data.socialMedia.facebook || 0}`, inline)
      .addField(`<:twitter:959963320343998494> Twitter`, `${data.socialMedia.twitter || 0}`, inline)
      .addField(`<:instagram:959963320960548894> Instagram`, `${data.socialMedia.instagram || 0}`, inline)
      .addField(`<:tiktok:959963321740701816> Tiktok`, `${data.socialMedia.tiktok || 0}`, inline)
      .setImage(`${data.banner}`);

    const profile = new Discord.MessageEmbed()
        .setTitle(`${data.account.username} Profile`)
        .setDescription(`**Title : ** ${data.bio}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor(`#${color}`)
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
      const embedmessage = await message.channel.send({
        embeds: [profile],
        components: [pbutton],
      });

      // Button Response
      const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply({ content: "You cant use this button" });
      };

      const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
      })

      collector.on("end", (ButtonInteraction) => {
        const id = ButtonInteraction.first().customId;

		embedmessage.delete();

        if (id === "game") {
          return message.channel.send({
            embeds: [gameProfile],
          });
        }
        if (id === "sosmed") {
          return message.channel.send({
            embeds: [socialMedia],
          });
        }
      });
    }
};
