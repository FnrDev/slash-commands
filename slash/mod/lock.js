module.exports = {
	name: "lock",
	permissions: "MANAGE_CHANNELS",
	description: "🔒 Disables @everyone from sending messages in specific channel",
	options: [
		{
			name: "channel",
			description: "Channel to lock.",
			type: 7,
			channel_types: [0],
		},
	],
	timeout: 3000,
	category: "mod",
	run: async (interaction) => {
		const channel = interaction.options.getChannel("channel") || interaction.channel;
		const isLocked = channel.permissionOverwrites.cache
			.find((r) => r.id === interaction.guild.id)
			.deny.has("SEND_MESSAGES");
		if (isLocked) {
			return interaction.reply({ content: `**:x: #${channel.name} already locked.**` });
		}
		await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
		interaction.reply({ content: `**🔒 ${channel} has been locked.**` });
	},
};
