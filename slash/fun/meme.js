const axios = require('axios');
const { ActionRow, ButtonComponent } = require('discord.js')

module.exports = {
    name: "meme",
    description: "Get a random meme",
    timeout: 5000,
    category: "fun",
    run: async(interaction) => {
        await interaction.deferReply()
        const url = 'https://meme-api.herokuapp.com/gimme';
        const data = (await axios.get(url)).data;
        const row = new ActionRow()
        .addComponents(
            new ButtonComponent()
            .setLabel('Meme Link')
            .setStyle('LINK')
            .setURL(data.postLink)
        )
        interaction.editReply({ files: [data.url], components: [row] })
    }
}