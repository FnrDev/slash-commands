module.exports = {
    name: "unlock",
    permissions: "MANAGE_CHANNELS",
    description: "🔒 Remove denied sending messages from @everyone in specific channel",
    options: [
        {
            name: "channel",
            description: "Channel to unlock.",
            type: 7,
            channel_types: [0]
        }
    ],
    timeout: 3000,
    category: "mod",
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const isUnlocked = channel.permissionOverwrites.cache.find(r => r.id === interaction.guild.id).deny.has('SEND_MESSAGES');
        if (!isUnlocked) {
            return interaction.reply({ content: `**:x: #${channel.name} already unlocked.**` })
        }
        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
        interaction.reply({ content: `**🔓 ${channel} has been unlock.**` })
    }
}