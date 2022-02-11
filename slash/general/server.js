const { Util, Embed } = require('discord.js');

module.exports = {
	name: 'server',
	description: 'Get info about server',
	timeout: 3000,
	category: 'general',
	run: async (interaction) => {
		const embed = new Embed()
			.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
			.setColor(Util.resolveColor('Random'))
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields(
				{
					name: ':id: Server ID:',
					value: interaction.guild.id,
					inline: true,
				},
				{
					name: ':calendar: Created On:',
					value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:f> | <t:${Math.floor(
						interaction.guild.createdTimestamp / 1000,
					)}:R>`,
					inline: true,
				},
				{
					name: ':crown: Owned By:',
					value: `<@${interaction.guild.ownerId}>`,
					inline: true,
				},
				{
					name: `:busts_in_silhouette: Members: (${interaction.guild.memberCount})`,
					value: `${interaction.guild.premiumSubscriptionCount} Boosts :sparkles:`,
					inline: true,
				},
				{
					name: `:speech_balloon: Channels (${interaction.guild.channels.cache.size})`,
					value: `**${interaction.guild.channels.cache.filter((r) => r.type == 'GUILD_TEXT').size}** Text | **${
						interaction.guild.channels.cache.filter((r) => r.type == 'GUILD_VOICE').size
					}** Voice | **${interaction.guild.channels.cache.filter((r) => r.type === 'GUILD_CATEGORY').size}** Category`,
					inline: true,
				},
				{
					name: ':earth_africa: Others',
					value: `**Verification Level:** ${interaction.guild.verificationLevel}`,
					inline: true,
				},
			);
		interaction.reply({
			embeds: [embed],
		});
	},
};
