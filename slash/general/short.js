const { default: axios } = require("axios");
const { ActionRow, ButtonComponent, ButtonStyle } = require('discord.js');

module.exports = {
    name: "short",
    description: "Short a long url",
    options: [
        {
            name: "url",
            description: "Url to short",
            type: 3,
            required: true
        },
        {
            name: "pass",
            description: "Password for url",
            type: 3
        },
        {
            name: "attachment",
            description: "Short an a image attachment",
            type: 11
        }
    ],
    timeout: 5000,
    category: "general",
    run: async(interaction) => {
        await interaction.deferReply();
        const url = interaction.options.getString('url');
        const pass = interaction.options.getString('pass') || null;
        const attachment = interaction.options.getAttachment('attachment');
        const apiToken = 'FpUKcPXsHerxsLUl'; // Get your api key from <https://i8.ae/developers>
        if (!apiToken) {
            return interaction.editReply({ content: ":x: Missing api token, check https://i8.ae/developers to get key." })
        }
        attachment ? attachment.contentType !== 'image/png' : null
        try {
            const data = (await axios({
                url: "https://i8.ae/api/url/add",
                method: "POST",
                headers: {
                    Authorization: apiToken
                },
                data: {
                    url: attachment ? attachment.url : url,
                    password: pass
                }
            })).data;
            const row = new ActionRow()
            .addComponents(
                new ButtonComponent()
                .setStyle(ButtonStyle.Link)
                .setURL(data.shorturl)
                .setLabel('URL')
            )
            interaction.editReply({ content: "**Short URL:**", components: [row] })
        } catch (e) {
            console.error(e);
            return interaction.editReply({ content: `:x: ${e}` })
        }
    }
}