const Discord = require('discord.js');

module.exports = {
    name: "unban",
    permissions: "BAN_MEMBERS",
    description: "Unban user from this server",
    options: [
        {
            name: "user",
            description: "user to unban",
            type: 3,
            required: true
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getString('user');
        try {
            await interaction.guild.bans.remove(user);
            const unbanUser = await client.users.fetch(user)
            interaction.reply({ content: `✅ **@${unbanUser.username} has been unbanned**` })
        } catch (e) {
            console.error(e)
            return interaction.reply({ content: `Error: ${e}` })
        } 
    }
}