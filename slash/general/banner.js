const { Embed, ActionRow, ButtonComponent, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'banner',
	description: 'Get user banner',
	options: [
		{
			name: 'user',
			description: 'user to get banner for',
			type: 6,
		},
	],
	timeout: 3000,
	category: 'general',
	run: async (interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;
		await user.fetch(); // to get user banner you need to fetch user before getting banner
		const embed = new Embed()
			.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setImage(user.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
			.setFooter({
				text: `Requested by ${interaction.user.tag}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
		const row = new ActionRow().addComponents(
			new ButtonComponent()
				.setStyle(ButtonStyle.Link)
				.setURL(user.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
				.setLabel('User Banner'),
		);
		interaction.reply({ embeds: [embed], components: [row] });
	},
};
