const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { statusPTC } = require('../../handler/profileHelper.js');
const Guild = require('../../models/Guild.js');
const { COLOR } = process.env;

module.exports = {
    name: 'myconfig',
    description: 'Melihat settingan server',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
            return message.reply(`Siapa lu woy!!`).then(msg => {
                setTimeout(() => msg.delete(), 3000)
            });

            let data = await Guild.findOne({
                guildID: message.guild.id
            });

            if (!data) return;

            let embed = new MessageEmbed()
                .setTitle(`${message.member.guild.name} Config`)
                .setColor(COLOR)
                .setDescription(`Berikut ini adalah settingan untuk ${message.member.guild.name}`)
                .addField(`Prefix`, data.prefix)
                .addField(`Welcome Channel`, `${client.channels.cache.get(data.channel.welcome) || `Unknown`}`, true)
                .addField(`Bye Channel`, `${client.channels.cache.get(data.channel.bye) || `Unknown`}`, true)
                .addField(`Modlog Channel`, `${client.channels.cache.get(data.channel.modlog) || `Unknown`}`, true)
                .addField(`Incomelog Channel`, `${client.channels.cache.get(data.channel.income) || `Unknown`}`, true)
                .addField(`Levelup Channel`, `${client.channels.cache.get(data.channel.levelup) || `Unknown`}`, true)
                .addField(`Chatmoney Channel`, `${client.channels.cache.get(data.channel.chatmoney) || `Unknown`}`, true)
                .addField(`Story/Anon Channel`, `${client.channels.cache.get(data.channel.story) || `Unknown`}`, true)
                .addField(`AFK Channel`, `${client.channels.cache.get(data.channel.afk) || `Unknown`}`, true)
                .addField(`Isolasi Channel`, `${client.channels.cache.get(data.channel.isolasi) || `Unknown`}`, true)
                .setTimestamp();

            let embed2 = new MessageEmbed()
                .setTitle(`${message.member.guild.name} Config`)
                .setColor(COLOR)
                .setDescription(`Berikut ini adalah settingan untuk ${message.member.guild.name}`)
                .addField(`Prefix`, data.prefix)
                .addField(`Admin Role`, `${message.guild.roles.cache.get(data.role.adminRole) || `Unknown`}`, true)
                .addField(`Moderator Role`, `${message.guild.roles.cache.get(data.role.modRole) || `Unknown`}`, true)
                .addField(`Muted Role`, `${message.guild.roles.cache.get(data.role.mutedRole) || `Unknown`}`, true)
                .addField(`VIP Role`, `${message.guild.roles.cache.get(data.role.vipRole) || `Unknown`}`, true)
                .addField(`Warn 1 Role`, `${message.guild.roles.cache.get(data.role.warn1) || `Unknown`}`, true)
                .addField(`Warn 2 Role`, `${message.guild.roles.cache.get(data.role.warn2) || `Unknown`}`, true)
                .addField(`Warn 3 Role`, `${message.guild.roles.cache.get(data.role.warn3) || `Unknown`}`, true)
                .addField(`Warn 4 Role`, `${message.guild.roles.cache.get(data.role.warn4) || `Unknown`}`, true)
                .addField(`Up Custom Role`, `${message.guild.roles.cache.get(data.role.upCrRole) || `Unknown`}`, true)
                .setTimestamp();

            let embed3 = new MessageEmbed()
                .setTitle(`${message.member.guild.name} Config`)
                .setColor(COLOR)
                .setDescription(`Berikut ini adalah settingan untuk ${message.member.guild.name}`)
                .addField(`Prefix`, data.prefix)
                .addField(`Welcome Status`, `${statusPTC(data.active.welcome)}`, true)
                .addField(`Bye Status`, `${statusPTC(data.active.bye)}`, true)
                .addField(`Apply Status`, `${statusPTC(data.active.apply)}`, true)
                .addField(`Convert Status`, `${statusPTC(data.active.convert)}`, true)
                .addField(`Give Status`, `${statusPTC(data.active.give)}`, true)
                .setTimestamp();
            
            let embed4 = new MessageEmbed()
                .setTitle(`${message.member.guild.name} Config`)
                .setColor(COLOR)
                .setDescription(`Berikut ini adalah settingan untuk ${message.member.guild.name}`)
                .addField(`Prefix`, data.prefix)
                .addField(`Fine Setting`, `Minimum : Rp.${data.fined.min}\nMaximum : Rp.${data.fined.max}`)
                .addField(`Chat Income Setting`, `Minimum : Rp.${data.money.min}\nMaximum : Rp.${data.money.max}`)
                .addField(`Exp Setting`, `Minimum : ${data.exp.min}\nMaximum : ${data.exp.max}`)
                .setTimestamp();
            
            //Page Button
            const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setStyle('DANGER');

            const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setStyle('SUCCESS');

                let page = 0;
    
                pages = [
                  embed,
                  embed2,
                  embed3,
                  embed4,
              ];
                
              buttonList = [
                    button1,
                    button2,
              ];
        
          const row = new MessageActionRow().addComponents(buttonList);
          const curPage = await message.channel.send({
            embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
            components: [row],
          });
        
          const filter = (i) =>
            i.customId === buttonList[0].customId ||
            i.customId === buttonList[1].customId;
        
          const collector = await curPage.createMessageComponentCollector({
            filter,
            time: 120_000,
          });
        
          collector.on("collect", async (i) => {
            switch (i.customId) {
              case buttonList[0].customId:
                page = page > 0 ? --page : pages.length - 1;
                break;
              case buttonList[1].customId:
                page = page + 1 < pages.length ? ++page : 0;
                break;
              default:
                break;
            }
            await i.deferUpdate();
            await i.editReply({
              embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
              components: [row],
            });
            collector.resetTimer();
          });
        
          collector.on("end", () => {
            if (!curPage.deleted) {
              const disabledRow = new MessageActionRow().addComponents(
                buttonList[0].setDisabled(true),
                buttonList[1].setDisabled(true)
              );
              curPage.edit({
                embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
                components: [disabledRow],
              });
            }
          });
        
          return curPage;

        } catch (error) {
            return console.log(error)
        };

    }
}