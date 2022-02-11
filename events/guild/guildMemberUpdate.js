const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
	if (oldMember.pending && !newMember.pending) {
		const role = newMember.guild.roles.cache.get(config.autoRoleId);
		if (!role) return;
		newMember.roles.add(role, `AutoRole`);
	}
	if (!oldMember.isCommunicationDisabled() && newMember.isCommunicationDisabled()) {
		const logChannel = client.channels.cache.get(config.log_channel_id);
		if (!logChannel) return;
		const allLogs = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' });
		const fetchModerator = allLogs.entries.first();
		const embed = new Embed()
			.setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**⏲ ${newMember} has been timeout**`)
			.addField({
				name: 'Timeout will be removed at:',
				value: `<t:${Math.floor(newMember.communicationDisabledUntilTimestamp / 1000)}:R>`,
				inline: true,
			})
			.addField({ name: 'Reason:', value: fetchModerator.reason || 'No reason provided.', inline: true })
			.setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() });
		return logChannel.send({ embeds: [embed] });
	}
	if (oldMember.isCommunicationDisabled() && !newMember.isCommunicationDisabled()) {
		const logChannel = client.channels.cache.get(config.log_channel_id);
		if (!logChannel) return;
		const embed = new Embed()
			.setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**⏲ ${newMember} has been removed from timeout**`)
			.addField({ name: 'Reason:', value: 'Timeout ended!', inline: true })
			.setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() });
		logChannel.send({ embeds: [embed] });
	}
};
