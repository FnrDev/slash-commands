const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, guild, vanityURL) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const embed = new Discord.MessageEmbed()
		.setAuthor({ name: guild.name, iconURL: guild.iconURL() })
		.setDescription(`**${guild.name} has removed a vanity url** [URL](${vanityURL})`)
		.setTimestamp();
	return logChannel.send({ embeds: [embed] });
};
