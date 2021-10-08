module.exports = {
    name: "unlock",
    permissions: "MANAGE_CHANNELS",
    description: "🔒 Remove denied sending messages from @everyone in specific channel",
    options: [
        {
            name: "channel",
            description: "Channel to unlock.",
            type: 7,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
        interaction.reply({ content: `**🔓 ${channel} has been unlock.**` })
    }
}