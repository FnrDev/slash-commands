const Discord = require('discord.js');

module.exports = {
    name: "setnick",
    description: "Change nickname for user",
    permissions: "MANAGE_NICKNAMES",
    options: [
        {
            name: "user",
            description: "User to change nickname for",
            type: 6,
            required: true
        },
        {
            name: "nickname",
            description: "Nickname to change to",
            type: 3,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getMember('user');
        const nickname = interaction.options.getString('nickname');
        if (!nickname) {
            await user.setNickname('', `By: ${interaction.user.tag}`)
            return interaction.reply({ content: `✅ **${user.user.username} nick has been reset!**` })
        }
        try {
            await user.setNickname(nickname, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ **${user.user.username} nick has been changed to ${nickname}**` })
        } catch (e) {
            console.error(e)
            return interaction.reply({ content: `Error: ${e}` })
        }
    }
}