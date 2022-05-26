const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');
Canvas.registerFont('fonts/Myriad Pro Bold.ttf', { family: 'Myriad Pro Bold' });
Canvas.registerFont('fonts/FantasqueSansMono-Regular.ttf', { family: 'FantasqueSansMonoRegular' });
Canvas.registerFont('fonts/Catamaran-Thin.ttf', { family: 'Catamaran' });

const User = require('../../models/User');
const moment = require('moment-timezone');

module.exports = {
    name: "wallet",
    description: "Showing user wallet",
    options: [{
        type: 6,
        name: 'user',
        description: "Showing wallet user",
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

        const userData = await User.findOne({
            guildID: interaction.guild.id,
            userID: user.id,
        });
        if (!userData) return;

        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        const userSaldo = formatter.format(userData.money);
        let userPoint = `${userData.point} Points`

        const member = interaction.guild.members.cache.get(user.id);
        const joinDate = moment.utc(member.joinedAt).format("MM/YY");
        const userTag = user.tag;

        const canvas = Canvas.createCanvas(600, 350);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(`https://i.ibb.co/Yty7gFp/wallet-bg.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const logo = await Canvas.loadImage(`https://i.ibb.co/c1PyvLR/MGS-GTA-CREW.png`);
        ctx.drawImage(logo, 488, 40, 65, 65);

        ctx.font = '50px Myriad Pro Bold';
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('MGS BANK.', 42, 80)

        ctx.font = '25px Catamaran'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('Saldo :', 55, 146)

        ctx.font = '38px Myriad Pro Bold'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(userSaldo, 55, 180, 350)

        ctx.font = '25px Catamaran'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('Point :', 55, 220)

        ctx.font = '38px Myriad Pro Bold'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(userPoint, 55, 253, 350)

        ctx.font = '31px FantasqueSansMonoRegular'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(userTag, 45, 310, 300)

        ctx.font = '17px FantasqueSansMonoRegular'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(`REGISTERED`, 459, 273)

        ctx.font = '38px FantasqueSansMonoRegular'
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(joinDate, 454, 305)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'wallet.png');
        interaction.followUp({ files: [attachment] });
    },
};
