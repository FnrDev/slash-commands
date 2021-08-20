const Discord = require('discord.js');

module.exports = {
    name: "roles",
    description: "Get a list of roles in the server",
    timeout: 3000,
    run: async(interaction) => {
        interaction.reply({ content: `\`\`\`\n${interaction.guild.roles.cache.sort((a,b) => b.position - a.position).map(r => r.name).join("\n")}\`\`\`` })
    }
}