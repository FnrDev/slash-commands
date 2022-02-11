const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async (guild, bannerURL) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const embed = new Embed()
		.setAuthor({ name: guild.name, iconURL: guild.iconURL() })
		.setDescription(`**${guild.name} has banner now!**`)
		.setImage(bannerURL)
		.setTimestamp();
	return logChannel.send({ embeds: [embed] });
};
