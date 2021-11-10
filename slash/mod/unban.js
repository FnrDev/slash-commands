const Discord = require('discord.js');

module.exports = {
    name: "unban",
    permissions: "BAN_MEMBERS",
    description: "Unban user from this server",
    options: [
        {
            name: "input",
            description: "user to unban",
            type: 3,
            required: true
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const input = interaction.options.getString('input');
        try {
            const user = await interaction.guild.bans.remove(input, `By: ${interaction.user.tag}`);
            interaction.reply({ content: `✅ **@${user.username} has been unbanned**` })
        } catch (e) {
            console.error(e)
            return interaction.reply({ content: `Error: ${e}` })
        } 
    }
}