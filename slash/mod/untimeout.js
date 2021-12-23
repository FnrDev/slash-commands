module.exports = {
    name: "untimeout",
    description: "Remove timeout from user.",
    options: [
        {
            name: "user",
            description: "User to remove timeout from.",
            type: 6,
            required: true
        }
    ],
    permissions: "MODERATE_MEMBERS",
    run: async(interaction) => {
        const member = interaction.options.getMember('user');
        await member.disableCommunicationUntil(null, `By: ${interaction.user.tag}`);
        interaction.reply({
            content: `Timeout has been removed from ${member}`
        })
    }
}