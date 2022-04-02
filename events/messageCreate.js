const client = require("../index");
const User = require("../models/User.js");
const Guild = require("../models/Guild.js");
const { MessageEmbed } = require("discord.js");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;
    
        let user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
        let guild = await Guild.findOne({ guildID: message.guild.id });
        if (!guild) {
            const newGuild = new Guild({ guildID: message.guild.id });
            newGuild.save();
            return;
        }
        if (!user) {
            const account = {
                username: author.username,
                userId: message.author.id,
            };
            User.create({
                account,
                guildID: message.guild.id,
                userID: message.author.id,
            });
		return;
	}

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    // Blacklist usecommand
    if (user.blacklist == 'true') {
        const embed = new MessageEmbed()
            .setColor(client.config.colorEmbed)
            .setTitle('[⚠️] Warning!')
            .setDescription('Kamu tidak dapat menggunakan command dikarenakan kamu telah di blacklist!\nHarap hubungi Administrator untuk membuka kembali blacklist anda.')
            
        return channel.send({ embeds: [ embed ] }).then(d => d.delete({ timeout : 10000 }));
    };

    await command.run(client, message, args);
});
