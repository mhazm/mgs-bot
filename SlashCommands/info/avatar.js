const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Showing user profile",
    options: [{
        type: 6,
        name: 'user',
        description: "Showing profile user",
        required: false,
    }],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const user = interaction.options.getUser("user") || interaction.user;

        let embed = new MessageEmbed()
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))

        interaction.followUp({ content: `${user.username}'s Profile`, embeds: [embed]})
    },
};
