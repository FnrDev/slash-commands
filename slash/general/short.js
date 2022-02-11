const { default: axios } = require('axios');
const { ActionRow, ButtonComponent, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'short',
	description: 'Short a long url',
	options: [
		{
			name: 'url',
			description: 'Url to short',
			type: 3,
			required: true,
		},
		{
			name: 'pass',
			description: 'Password for url',
			type: 3,
		},
	],
	timeout: 5000,
	category: 'general',
	run: async (interaction) => {
		const url = interaction.options.getString('url');
		const pass = interaction.options.getString('pass') || '';
		const apiToken = ''; // Get your api key from <https://i8.ae/user/tools#api>
		if (!apiToken) {
			return interaction.reply({ content: ':x: Missing api token' });
		}
		try {
			const data = (
				await axios({
					url: 'https://i8.ae/api/url/add',
					method: 'POST',
					headers: {
						Authorization: apiToken,
					},
					data: {
						url: url,
						password: pass,
					},
				})
			).data;
			const row = new ActionRow().addComponents(
				new ButtonComponent().setStyle(ButtonStyle.Link).setURL(data.shorturl).setLabel('URL'),
			);
			interaction.reply({ content: '**Short URL:**', components: [row] });
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: `:x: ${e}` });
		}
	},
};
