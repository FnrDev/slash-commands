const axios = require('axios');
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: "meme",
    description: "Get a random meme",
    timeout: 5000,
    run: async(interaction) => {
        await interaction.deferReply()
        const url = 'https://meme-api.herokuapp.com/gimme';
        const req = await axios.get(url);
        const data = req.data;
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Meme Link')
            .setStyle('LINK')
            .setURL(data.postLink)
        )
        interaction.editReply({ files: [data.url], components: [row] })
    }
}