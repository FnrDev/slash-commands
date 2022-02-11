module.exports = {
	name: 'unban',
	permissions: 'BAN_MEMBERS',
	description: 'Unban user from this server',
	options: [
		{
			name: 'input',
			description: 'user to unban',
			type: 3,
			required: true,
		},
	],
	timeout: 3000,
	category: 'mod',
	run: async (interaction) => {
		const input = interaction.options.getString('input');
		if (input === 'all') {
			const fetchBans = await interaction.guild.bans.fetch();
			if (!fetchBans) {
				return interaction.reply('There are no banned users.');
			}
			fetchBans
				.map((r) => r.user.id)
				.forEach((user) => {
					interaction.guild.bans.remove(user, `By: ${interaction.user.tag} unban all`);
				});
			return interaction.reply(`✅ **${fetchBans.size}** members being unbanned`);
		}
		try {
			const user = await interaction.guild.bans.remove(input, `By: ${interaction.user.tag}`);
			interaction.reply({ content: `✅ **@${user.username} has been unbanned**` });
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: `Error: ${e}` });
		}
	},
};
