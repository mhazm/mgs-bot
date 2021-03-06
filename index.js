const { Client, Collection, Intents } = require("discord.js");

const client = new Client({ intents: 
    [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS]
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.version = require("./package.json").version;
require('dotenv').config();
require('./src/routes/index');


// Initializing the project
require("./handler")(client);

client.on("messageCreate", async(message) => {
    require('./features/afk')(client, message);
})

client.login(process.env.TOKEN);
