const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async (client, message) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const allLogs = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' });
	const fetchModerator = allLogs.entries.first();
	const embed = new Embed()
		.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
		.setDescription(`🗑 **Message sent by ${message.author} deleted in ${message.channel}.**\n${message.content}`)
		.addField({ name: 'Responsible Moderator:', value: `<@${fetchModerator.executor.id}>` })
		.setTimestamp()
		.setFooter({
			text: fetchModerator.executor.tag,
			iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }),
		});
	return logChannel.send({ embeds: [embed] });
};
