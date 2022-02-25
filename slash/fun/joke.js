const axios = require("axios");

module.exports = {
	name: "joke",
	description: "Get random joke",
	timeout: 5000,
	category: "fun",
	run: async (interaction) => {
		await interaction.deferReply();
		const url = "https://some-random-api.ml/joke";
		const data = (await axios.get(url)).data;
		interaction.editReply(data.joke);
	},
};
