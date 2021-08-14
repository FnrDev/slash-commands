const axios = require('axios');

module.exports = {
    name: "meme",
    description: "Get a random meme",
    timeout: 5000,
    run: async(interaction) => {
        await interaction.deferReply()
        const url = 'https://meme-api.herokuapp.com/gimme';
        const req = await axios.get(url);
        const data = req.data;
        interaction.editReply({ files: [data.url] })
    }
}