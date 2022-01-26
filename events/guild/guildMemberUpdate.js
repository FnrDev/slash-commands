const config = require('../../config.json');
const Discord = require('discord.js');

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
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**⏲ ${newMember} has been timeout**`)
			.addField(
				'Timeout will be removed at:',
				`<t:${Math.floor(newMember.communicationDisabledUntilTimestamp / 1000)}:R>`,
				true,
			)
			.addField('Reason:', fetchModerator.reason || 'No reason provided.', true)
			.setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() });
		return logChannel.send({ embeds: [embed] });
	}
	if (oldMember.isCommunicationDisabled() && !newMember.isCommunicationDisabled()) {
		const logChannel = client.channels.cache.get(config.log_channel_id);
		if (!logChannel) return;
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**⏲ ${newMember} has been removed from timeout**`)
			.addField('Reason:', 'Timeout ended!', true)
			.setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() });
		logChannel.send({ embeds: [embed] });
	}
};
