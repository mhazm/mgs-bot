const Discord = require("discord.js");
const User = require("../../models/User.js");
const moment = require('moment-timezone');
moment.locale('id');

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
    let joindate = moment.tz(member.joinedAt, "Asia/Jakarta").format("dddd, Do MMMM YYYY | HH:mm zz")

    if (member.bot) return message.channel.send("Its A Bot -_-");

    // Get UserDB Data
    let data = await User.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    if (!data) return;

    const color = data.rankcard.color;
	  const inline = true;
    const level = data.level;
    const exp = process.env.UPXP;
    exprequired = Math.round(level * exp);

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    let userMoney = formatter.format(data.money);
    if (!userMoney) {
      userMoney = formatter.format(0);
    }


    //Profile Button
    const button1 = new Discord.MessageButton()
    .setCustomId('previousbtn')
    .setLabel('Previous')
    .setStyle('DANGER');

    const button2 = new Discord.MessageButton()
    .setCustomId('nextbtn')
    .setLabel('Next')
    .setStyle('SUCCESS');

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
        .addField("💰 Money", `${userMoney}`, inline)
        .addField("🛡️ Level", `${data.level || 0}`, inline)
        .addField("🏃‍♂️ XP", `${data.xp || 0}/${exprequired}`, inline)
        .addField("📧 Messages", `${data.messages || 0}`, inline)
        .addField("👮 Warn", `${data.warn || 0}/${process.env.WARN}`, inline)
        .addField("💤 Mute", `${data.muted || 0}x`, inline)
        .setImage(`${data.banner}`)
    
      let page = 0;
    
        pages = [
          profile,
          gameProfile,
          socialMedia,
      ];
        
      buttonList = [
            button1,
            button2,
      ];

  const row = new Discord.MessageActionRow().addComponents(buttonList);
  const curPage = await message.channel.send({
    embeds: [pages[page].setFooter({text: `Page ${page + 1} / ${pages.length} | Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })],
    components: [row],
  });

  const filter = (i) =>
    i.customId === buttonList[0].customId ||
    i.customId === buttonList[1].customId;

  const collector = await curPage.createMessageComponentCollector({
    filter,
    time: 120_000,
  });

  collector.on("collect", async (i) => {
    switch (i.customId) {
      case buttonList[0].customId:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case buttonList[1].customId:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      default:
        break;
    }
    await i.deferUpdate();
    await i.editReply({
      embeds: [pages[page].setFooter({text: `Page ${page + 1} / ${pages.length} | Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })],
      components: [row],
    });
    collector.resetTimer();
  });

  collector.on("end", () => {
    if (!curPage.deleted) {
      const disabledRow = new Discord.MessageActionRow().addComponents(
        buttonList[0].setDisabled(true),
        buttonList[1].setDisabled(true)
      );
      curPage.edit({
        embeds: [pages[page].setFooter({text: `Page ${page + 1} / ${pages.length} | Request by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })],
        components: [disabledRow],
      });
    }
  });

  return curPage;
  }
};
