const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const Guild = require('../../models/Guild');
const Convert = require('../../models/Convert');

module.exports = {
    name: 'payoutdone',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });
        }

        const guildname = message.member.guild.name;
        const guildava = message.guild.iconURL({ dynamic: true });

        const member = message.mentions.users.first() || message.author || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply(`User tidak ditemukan!`);

        const guild = await Guild.findOne({
            guildID: message.guild.id,
        })
        if (!guild) return;

        const convertCh = client.channels.cache.get(guild.channel.convert);
        if (!convertCh) return message.reply(
            `Convert Channel tidak ditemukan! Harap setting terlebih dahulu dengan ${guild.prefix}setch convert <tag channel>`
        ).then(msg => {
            setTimeout(() => msg.delete(), 5000)
        });
        
        // PROSES
        try {
            Convert.findOne({ guildID: message.guild.id, userID: member.id}, async(err, data) => {
                if (err) throw err;
                if (data) {
                    let number = parseInt(args[1]) - 1
                    data.convertdata.splice(number, 1)
                    message.channel.send('Sukses mengubah data').then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                    data.save()

                    let embed = new MessageEmbed()
                        .setDescription(`Sukses mengirim permintaan convert!`)
                        .setThumbnail(message.guild.iconURL({dynamic: true}))
                        .setColor("BLUE")
                        .addField("Kepada", `<@${member.id}>`, true)
                        .addField("Moderator", `<@${message.author.id}>`, true)
                        .setTimestamp()
                        .setFooter({text: `${guildname}`})
                    convertCh.send(embed);

                    let embedM = new MessageEmbed()
                    .setTitle('Permintaan Payout telah selesai!')
                    .setColor("BLUE")
                    .setDescription(
                        `Terimakasih telah melakukan permintaan payout!. Permintaan kamu telah kami kirimkan dan kami tunggu yang selanjutnya ya!
                        Tetap aktif ya di server ${guildname}!`
                    )
                    .setTimestamp()
                    .setFooter({text: guildname, iconURL: guildava})
                    member.send({ embeds: [embedM] });
                }
            })

        } catch (err) {
            return console.log(err)
        }

    }
}