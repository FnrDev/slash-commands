const { default: axios } = require("axios");

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
        }
    ],
    timeout: 5000,
    run: async(interaction) => {
        const url = interaction.options.getString('url');
        const pass = interaction.options.getString('pass') || ''
        const apiToken = 'qEAVjX9WYOTWDrwhXrQb'; // Get your api key from <https://i8.ae/user/tools#api>
        if (!apiToken) {
            return interaction.reply({ content: ":x: Missing api token" })
        }
        try {
            const req = await axios({
                url: "https://i8.ae/api/url/add",
                method: "POST",
                headers: {
                    Authorization: apiToken
                },
                data: {
                    url: url,
                    password: pass
                }
            })
            const data = req.data;
            interaction.reply(`**[Short URL](${data.short})**\n**Password:** \`${pass}\``)
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: `:x: ${e}` })
        }
    }
}