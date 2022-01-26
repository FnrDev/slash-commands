const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, channel, oldTopic, newTopic) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const embed = new Discord.MessageEmbed()
		.setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL({ dynamic: true }) })
		.addFields(
			{
				name: '📝 Old Topic:',
				value: oldTopic || 'None',
			},
			{
				name: '📝 New Topic',
				value: newTopic || 'None',
			},
		)
		.setTimestamp();
	return logChannel.send({ embeds: [embed] });
};
