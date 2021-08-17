const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const fs = require("fs");
const config = require('./config.json');
const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
require('colors')

const commands = []
readdirSync("./commands/").map(async dir => {
	readdirSync(`./commands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.'.yellow);
		await rest.put(
			// if you want to make your slash commands in all guilds use "applicationCommands("CLIENT_ID")"
			Routes.applicationGuildCommands(config.botID, config.serverID),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.'.green);
	} catch (error) {
		console.error(error);
	}
})();

["handlers", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

  
client.login(token);