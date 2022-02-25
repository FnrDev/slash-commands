module.exports = {
	name: 'setcolor',
	permissions: 'MANAGE_ROLES',
	description: 'Changes role colors by hex codes.',
	options: [
		{
			name: 'role',
			description: 'Role to set color for',
			type: 8,
			required: true,
		},
		{
			name: 'hex_color',
			description: 'Hex color to set role for',
			type: 3,
			required: true,
		},
	],
	category: 'mod',
	run: async (interaction) => {
		const role = interaction.options.getRole('role');
		const hexColor = interaction.options.getString('hex_color');
		if (hexColor.length > 7) {
			return interaction.reply({ content: ':x: Hex color lenght must equal 6', ephemeral: true });
		}
		try {
			role.setColor(hexColor, `By: ${interaction.user.tag}`);
			interaction.reply({ content: `✅ Successfully changed **${role.name}** role to **${hexColor}**` });
		} catch (e) {
			return interaction.reply({ content: `**:x: Please check my permission and role postion**` });
		}
	},
};
