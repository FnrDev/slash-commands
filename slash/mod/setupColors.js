const wait = require('util').promisify(setTimeout);
const randomColor = require('randomcolor');

module.exports = {
	name: 'setup-colors',
	description: 'Setup list of colors',
	options: [
		{
			name: 'number',
			description: 'How many colors you want to create.',
			type: 4,
			required: true,
		},
	],
	permissions: 'MANAGE_ROLES',
	run: async (interaction) => {
		const number = interaction.options.getInteger('number');
		interaction.reply({ content: `**${number}** colors is being created.` });
		for (let i = 0; i < number; i++) {
			await interaction.guild.roles.create({
				name: `${i + 1}`,
				color: randomColor(),
				reason: 'Setup colors',
			});
			await wait(3000);
		}
	},
};
