const Discord = require("discord.js");
const Guild = require("../../models/Guild.js");

module.exports = {
  name:'anon',
  category:'account',
  description:'Membuat post sebagai anonymous',
  usage:'',
  aliases:[''],
  cooldown:1000,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
    try {
        await message.delete()
    let data = await Guild.findOne({
        guildID: message.guild.id
    });
    const questions = [
        "Apa yang mau kamu kirimkan sebagai anon?",
    ];

    let collectCounter = 0;
    let endCounter = 0;

    const appChannel = client.channels.cache.get(data.channel.story);

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector({
        filter,
        max: 5,
        time: 1000 * 20,
    });

    collector.on("collect", m => {
        if (collectCounter < questions.length) {
            channel.send(questions[collectCounter++]);
        }
        else {
            channel.send("Post akan disubmit!");
            console.log(`Collected ${m.content}`);
            let post = new Discord.MessageEmbed()
            .setTitle("📄 | AnonPost")
                .setColor("RANDOM")
                .setDescription(`${m.content || `Unknown Error`}`)
                .setTimestamp()
            appChannel.send({ embeds: [post] });
            collector.stop('terisi');
        };
    });

    } catch (error) {
        return console.log(error);
    }
  },
};