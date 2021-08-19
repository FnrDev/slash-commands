const Discord = require('discord.js');

module.exports = {
    name: "clear",
    description: "Cleans messages from a channel",
    options: [
        {
            name: "number_of_messages",
            description: "number of messages to clean",
            type: 3,
            required: true
        }
    ],
    timeout: 5000,
    run: async(interaction, client) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        let deleteAmount = interaction.options.getString('number_of_messages');
        if (isNaN(deleteAmount)) {
            return interaction.reply({ content: "Delete amount must be a number" })
        }
        if (deleteAmount > 100) {
            deleteAmount = 100
        }
        await interaction.channel.bulkDelete(+deleteAmount, true);
        interaction.reply({ content: `✅ Successfully deleted ${deleteAmount} messages` })
    }
}