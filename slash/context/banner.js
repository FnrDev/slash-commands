const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'get-banner',
	type: 3,
	run: async (interaction, client) => {
		const message = interaction.options.getMessage('message');
		const user = await client.users.cache.get(message.author.id);
		await user.fetch();
		if (!user.banner) {
			return interaction.reply({ content: ":x: This user doesn't have a banner", ephemeral: true });
		}
		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`[Banner URL](${message.author.bannerURL({ dynamic: true, format: 'png', size: 4096 })})`)
			.setImage(message.author.bannerURL({ dynamic: true, format: 'png', size: 4096 }))
			.setColor(interaction.guild.me.displayColor);
		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
