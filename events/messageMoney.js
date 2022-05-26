const client = require('../index')
const User = require('../models/User.js')
const Guild = require('../models/Guild.js')
const { MessageEmbed } = require('discord.js')

const cooldown = new Set();

function addToCooldown(ID) {
  let cd = Math.floor(Math.random() * (90000 - 200000) + 200000);
  cooldown.add(ID);
  setTimeout(() => {
    cooldown.delete(ID);
  }, cd /* random seconds */);
}

client.on('messageCreate', async (message) => {
    try {
        const member = message.author;
        if (!member) {
            return console.log('Unknown Member');
        }

        if (message.author.bot) return;
        if (!message.guild) return;

        const user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        })

        if (!user) {
            const account = {
                username: message.author.username,
                userId: message.author.id,
            }
            User.create({
                account,
                guildID: message.guild.id,
                userID: message.author.id,
            });
        }

        const guild = await Guild.findOne({ 
            guildID: message.guild.id,
        })

        const vipRole = message.guild.roles.cache.find(r => r.id === guild.role.vipRole);
        const author = message.guild.members.cache.get(member.id);

        if (message.channel.parentId === guild.channel.chatmoney) {
            if (!cooldown.has(member.id)) {
                addToCooldown(member.id);

                const moneylog = client.channels.cache.get(guild.channel.income);
                const levelup = client.channels.cache.get(guild.channel.levelup);
                const moneymin = guild.money.min;
                const moneymax = guild.money.max;
                const expmin = guild.exp.min;
                const expmax = guild.exp.max;

                let userWarn = user.warn;

                // DUIT + EXP
                let randexp = Math.floor(Math.random() * (expmax - expmin) + expmin);
                let rand = Math.floor(Math.random() * (moneymax - moneymin) + moneymin - userWarn);

                if (author.roles.cache.has(vipRole.id)) {
                    randexp *= 2;
                }

                if (guild.active.holiday === true) {
                    randexp *= 2;
                    rand *= 2;
                }

                // Saving
                try {
                    user.money += rand;
                    user.xp += randexp;
                } catch (error) {
                    console.log(error)
                }
                                
                const level = user.level;
                const exp = process.env.UPXP;
                const exprequired = Math.round(level * exp);

                if (user.xp >= exprequired) {
                    let uavatar = message.author.avatarURL({ size: 4096 });
                    let e = new MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setThumbnail(uavatar)
                        .setDescription(
                            `:tada: Congrats ${message.author.username} You Level Up\nYou are now level ${user.level}`
                        );
                    levelup.send({ message: `<@${message.author.id}>`, embeds: [e] });
                    user.xp -= exprequired;
                    user.level += 1;
                }
                await user.save()

                let e = new MessageEmbed()
                    .setColor("99d42c")
                    .setTitle("<:update:836111138576007228>︱Balance Update")
                    .setDescription(
                        `User: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\`\nChat on <#${message.channel.id}>`
                    )
                    .setTimestamp();
                moneylog.send({ embeds: [e] });
            }
        }
    } catch (err) {
        return console.log(err);
    }
})