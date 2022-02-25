const Discord = require('discord.js');

module.exports = {
	name: 'clear',
	permissions: 'MANAGE_MESSAGES',
	description: 'Cleans messages from a channel',
	options: [
		{
			name: 'number_of_messages',
			description: 'number of messages to clean',
			type: 10,
			required: true,
		},
		{
			name: 'user',
			description: 'User to clear messsages for',
			type: 6,
		},
		{
			name: 'role',
			description: 'Clear messages from role',
			type: 8,
		},
	],
	timeout: 5000,
	category: 'mod',
	run: async (interaction, client) => {
		let deleteAmount = interaction.options.getNumber('number_of_messages');
		const user = interaction.options.getUser('user');
		const role = interaction.options.getRole('role');
		if (deleteAmount > 100) {
			deleteAmount = 100;
		}
		const fetchedMessage = await interaction.channel.messages.fetch({ limit: deleteAmount });
		if (user) {
			fetchedMessage.filter((r) => r.author.id === user.id).forEach((msg) => msg.delete());
			return interaction.reply({ content: `✅ Successfully deleted ${fetchedMessage.size} messages` });
		}
		if (role) {
			fetchedMessage.filter((r) => r.member.roles.cache.has(role.id)).forEach((msg) => msg.delete());
			return interaction.reply({ content: `✅ Successfully deleted ${fetchedMessage.size} messages` });
		}
		fetchedMessage.forEach((msg) => msg.delete());
		interaction.reply({ content: `✅ Successfully deleted ${fetchedMessage.size} messages` });
	},
};
