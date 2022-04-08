const Discord = require("discord.js");
const db = require("quick.db");
const { COLOR } = process.env;

module.exports = async (client, message) => {
  try {
    let afk = new db.table("AFKs"),
      authorstatus = await afk.fetch(
        `userid_${message.author.id}_guild_${message.guild.id}`
      ),
      mentioned = message.mentions.members.first(),
      mesmention = message.guild.id;

    if (mentioned) {
      let status = await afk.get(
        `userid_${mentioned.id}_guild_${mesmention}.alasan`
      );
      let waktu = await afk.get(
        `userid_${mentioned.id}_guild_${mesmention}.time`
      );

      let msTos = Date.now() - waktu;
      let since = client.util.parseDur(msTos);
      if (status) {
        let estatus = new Discord.MessageEmbed()
          .setColor(COLOR)
          .setDescription(
            `**${mentioned.user.tag}** saat ini sedang AFK - **${since}** lalu\nSedang ${status}`,
            { disableMentions: "all" }
          );
        message.channel
          .send({ embeds: [estatus] })
          .then(msg => {
            setTimeout(() => msg.delete(), 10000)
          });
        
      }
    }

    if (authorstatus) {
      message
        .reply(`Selamat datang kembali!`)
      await afk.delete(`userid_${message.author.id}_guild_${message.guild.id}`).then(msg => {
        setTimeout(() => msg.delete(), 3000)
      });
    }
  } catch (err) {
    console.log(err.message);
    return;
  }
};
