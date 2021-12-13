const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: "npm",
    description: "Search in npm for package",
    options: [
        {
            name: "name",
            description: "Name of package to search about.",
            type: 3,
            required: true
        }
    ],
    category: "general",
    run: async(interaction) => {
        const name = interaction.options.getString('name');
        try {
            const req = await axios.get(`https://registry.npmjs.org/${name}`)
            const data = req.data;
            let getLastVersion = Object.keys(data.versions);
            getLastVersion[Object.keys(data.versions)[Object.keys(data.versions).length - 1]];
            const createtime = new Date(data.time.created).getTime();
            const modifiedTime = new Date(data.time.modified).getTime();
            console.log(createtime)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`NPM (${name})`, 'https://cdn.freebiesupply.com/logos/thumbs/2x/npm-logo.png', `https://npmjs.com/${name}`)
            .setDescription(data.description)
            .setColor('#ff0000')
            .addFields(
                { name: "Latest Version", value: getLastVersion.pop(), inline: true },
                { name: "License", value: data.license, inline: true },
                { name: "Author", value: `[${data.author.name}](https://npmjs.com/~${data.author.name})`, inline: true },
                { name: "Home Page", value: `[Home Page](${data.homepage})`, inline: true },
                { name: "Created At:", value: `<t:${Math.floor(createtime / 1000)}:R>`, inline: true },
                { name: "Modified", value: `<t:${Math.floor(modifiedTime / 1000)}:R>`, inline: true }
            )
            interaction.reply({
                embeds: [embed]
            })
        } catch (e) {
            console.error(e)
            return interaction.reply({
                content: "Not found.",
                ephemeral: true
            })
        }
    }
}