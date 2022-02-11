const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async (client, thread) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const allLogs = await thread.guild.fetchAuditLogs({ type: 'THREAD_CREATE' });
	const fetchModerator = allLogs.entries.first();
	const embed = new Embed()
		.setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL({ dynamic: true }) })
		.setDescription(`**<@${fetchModerator.executor.id}> has created <#${thread.id}> thread.**`)
		.addField({ name: 'Responsible Moderator:', value: `<@${fetchModerator.executor.id}>` })
		.setTimestamp()
		.setFooter({
			text: fetchModerator.executor.tag,
			iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }),
		});
	return logChannel.send({ embeds: [embed] });
};
