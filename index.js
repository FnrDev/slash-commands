const Discord = require("discord.js");
const client = new Discord.Client({ intents: [
	'Guilds',
	'GuildMessages',
	'GuildInvites',
	'GuildMembers',
	'GuildInvites',
	'GuildBans',
	'GuildEmojisAndStickers',
	'GuildVoiceStates'
]});
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.aliases = new Discord.Collection();
require('colors');
require('dotenv').config();

["handlers", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// process.on('unhandledRejection', (err) => {
// 	console.error(`Unhandled Rejection: ${err}`);
//   });
  
//   process.on('uncaughtException', (err) => {
// 	console.error(`Uncaught Exception: ${err}`);
//   });
  
client.login(process.env.TOKEN);