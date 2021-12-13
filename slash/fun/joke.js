const axios = require('axios');

module.exports = {
    name: "joke",
    description: "Get random joke",
    timeout: 5000,
    category: "fun",
   run: async(interaction) => {
        await interaction.deferReply()
        const url = 'https://some-random-api.ml/joke';
        const req = await axios.get(url);
        const data = req.data;
        interaction.editReply(data.joke)
   }
}