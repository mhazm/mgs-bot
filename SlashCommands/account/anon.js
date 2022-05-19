const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "anon",
    description: "Membuat postingan anonymous",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            interaction.followUp({ 
                content: `Silahkan check dm kamu untuk melanjutkan!`, 
                ephemeral: true
            });
            
            let data = await Guild.findOne({
                guildID: interaction.guild.id,
            })
            const questions = ['Apa yang mau kamu kirimkan sebagai anon?']

            let collectCounter = 0
            let endCounter = 0

            const appChannel = client.channels.cache.get(data.channel.story)

            const filter = (m) => m.author.id === interaction.author.id

            const appStart = await interaction.author.send(
                questions[collectCounter++]
            )
            const channel = appStart.channel

            const collector = channel.createMessageCollector({
                filter,
                max: 5,
                time: 3000 * 60,
                errors: ['time'],
            })

            collector.on('collect', (m) => {
                if (collectCounter < questions.length) {
                    channel.send(questions[collectCounter++])
                }
                if (m.content.toLowerCase() === 'quit') {
                    collector.stop('batal')
                } else {
                    channel.send('Post akan disubmit!')
                    console.log(`Collected ${m.content}`)
                    let post = new MessageEmbed()
                        .setTitle('📄 | AnonPost')
                        .setColor('RANDOM')
                        .setDescription(`${m.content || `Unknown Error`}`)
                        .setTimestamp()
                    appChannel.send({ embeds: [post] })
                    collector.stop('terisi')
                }
            })

            collector.on('end', (reason) => {
                if (reason === 'batal') {
                    channel.send(`Oke.. batal`)
                }
            })
        } catch (error) {
            return console.log(error)
        }
    },
};
