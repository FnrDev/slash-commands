const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_VOICE_STATES
], partials: [
	"MESSAGE",
	"CHANNEL"
]});
const config = require('./config.json');
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.aliases = new Discord.Collection();


["handlers", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

  
client.login(config.token);