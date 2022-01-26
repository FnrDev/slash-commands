const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, member, role) => {
	const logChannel = client.channels.cache.get(config.log_channel_id);
	if (!logChannel) return;
	const embed = new Discord.MessageEmbed()
		.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
		.setDescription(`**:writing_hand: ${member} roles has been updated.**`)
		.addField('Role:', `✅ ${role.name}`)
		.setTimestamp()
		.setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }));
	return logChannel.send({ embeds: [embed] });
};
