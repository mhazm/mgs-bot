const { Client, Message, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
Canvas.registerFont('fonts/Myriad Pro Bold.ttf', { family: 'Myriad Pro Bold' });
Canvas.registerFont('fonts/FantasqueSansMono-Regular.ttf', { family: 'FantasqueSansMonoRegular' });
Canvas.registerFont('fonts/Catamaran-Thin.ttf', { family: 'Catamaran' });

const User = require('../../models/User');
const moment = require('moment-timezone');

const cooldown = new Set();

function addToCooldown(ID) {
  let cd = Math.floor(Math.random() * (120000 - 240000) + 240000);
  cooldown.add(ID);
  setTimeout(() => {
    cooldown.delete(ID);
  }, cd /* random seconds */);
}

module.exports = {
    name: 'wallet',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
        if (!user) return;

        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        const userSaldo = formatter.format(user.money);
        let userPoint = `${user.point} Points`

        const member = message.guild.members.cache.get(message.author.id);
        const joinDate = moment.utc(member.joinedAt).format("MM/YY");
        const userTag = message.author.tag;

        
        if (!cooldown.has(message.author.id)) {
            addToCooldown(message.author.id);
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
            message.channel.send({ files: [attachment] });
        } else {
            return message.reply('You have cooldown to used this command!\nYou can use `d.money` for check your wallet').then(msg => {
                setTimeout(() => msg.delete(), 6000)
            });
        }        
    }
}