const Discord = require("discord.js");
const client = new Discord.Client({ intents: [
	'Guilds',
	'MessageContent',
	'GuildMembers',
	'GuildInvites',
	'GuildBans',
	'GuildEmojisAndStickers',
	'GuildVoiceStates'
]});
require('discord-logs')(client);
require('colors');
require('dotenv').config();

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();

["handlers", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

process.on('unhandledRejection', (error) => {
	console.error(error);
})
  
client.login(process.env.TOKEN);