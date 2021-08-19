module.exports = {
    name: "unlock",
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
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            await interaction.guild.commands.permissions.add({ command: interaction.commandId, permissions: [
                {
                    id: interaction.user.id,
                    type: "USER",
                    permission: false
                }
            ] })
            return interaction.reply({ content: "You dont have permission to do this command!", ephemeral: true })
        }
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: null });
        interaction.reply({ content: `**🔓 ${channel} has been unlock.**` })
    }
}