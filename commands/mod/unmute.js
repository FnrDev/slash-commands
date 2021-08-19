module.exports = {
    name: "unmute",
    description: "Unmutes a member",
    options: [
        {
            name: "user",
            description: "User to unmute",
            type: 6,
            required: true
        }
    ],
    run: async(interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            await interaction.guild.commands.permissions.add({ command: interaction.commandId, permissions: [
                {
                    id: interaction.user.id,
                    type: "USER",
                    permission: false
                }
            ] })
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        const user = interaction.options.getMember('user');
        const muteRole = interaction.guild.roles.cache.find(role => role.name == 'Muted');
        if (!user.roles.cache.has(muteRole.id)) {
            return interaction.reply({ content: ":x: This user is not muted" })
        }
        try {
            user.roles.remove(muteRole, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ ${user} has been unmuted` })
        } catch (e) {
            return interaction.reply({ content: `:x: Error: **${e}**` })
        }
    }
}