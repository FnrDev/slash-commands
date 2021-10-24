module.exports = {
    name: "lock",
    permissions: "MANAGE_CHANNELS",
    description: "🔒 Disables @everyone from sending messages in specific channel",
    options: [
        {
            name: "channel",
            description: "Channel to lock.",
            type: 7,
            channel_types: [0]
        }
    ],
    timeout: 3000,
    run: async(interaction) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
        interaction.reply({ content: `**🔒 ${channel} has been locked.**` })
    }
}