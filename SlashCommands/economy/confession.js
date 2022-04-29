const { Client, CommandInteraction } = require("discord.js");
const User = require("../../models/User");
const db = require("../../models/Warn");

module.exports = {
    name: "confession",
    description: "Menghapus satu warn dari warn list",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await User.findOne({
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        });

        if (!user) return;

        const saldo = user.money;

        const member = interaction.guild.members.cache.get(interaction.user.id)

        db.findOne({ guildid : interaction.guild.id, user: interaction.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                if (!data.content) return;

                let cost = 1000;
                if (saldo < cost) {
                    return interaction.followUp({ 
                        content: `Saldo kamu kurang untuk penghapusan warn!\nSaldo kamu hanya Rp ${saldo}\nHarga Penghapusan dosa adalah Rp ${cost}`, 
                        ephemeral: true
                    })
                }

                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                interaction.followUp({
                    content: `Penghapusan warn berhasil! Saldo kamu telah dikurangi sebanyak Rp ${cost} untuk biaya penghapusan warn.`
                })

                data.save()
                user.money -= cost;
                user.save();

            } else {
                interaction.followUp({
                    content: `Kamu bersih kok dari warn :)`
                });
            }
        })
    },
};
