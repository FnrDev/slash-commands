const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, ban) => {
	const logChannel = await client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const allLogs = await ban.guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE' });
	const fetchModerator = allLogs.entries.first();
	const embed = new Discord.MessageEmbed()
		.setAuthor({ name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
		.setDescription(`**🔨 <@${ban.user.id}> unbanned**`)
		.setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
		.addFields(
			{
				name: 'Responsible Moderator:',
				value: `<@${fetchModerator.executor.id}>`,
				inline: true,
			},
			{
				name: 'Unban Reason:',
				value: fetchModerator.reason || 'No reason',
				inline: true,
			},
		);
	logChannel.send({ embeds: [embed] });
};
