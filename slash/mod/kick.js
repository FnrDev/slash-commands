module.exports = {
    name: "kick",
    description: "kicks a member.",
    permissions: "KICK_MEMBERS",
    options: [
        {
            name: "user",
            description: "user to kick",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "reason for kick",
            type: 3,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || '';
        if (user.id === interaction.user.id) {
            return interaction.reply({ content: `:x: You can\'t kick yourself!` })
        }
        if (user.id === client.user.id) {
            return interaction.reply({ content: `:x: You can\'t kick me!` })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= role) {
            return interaction.reply("I can't kick this member because that member has role position is higher than my role or same as you!")
        }
        if (botRole <= role) {
            return interaction.reply("I can't kick this member because that member has role position is higher than my role or same as you!")
        }
        try {
            await user.kick(reason);
            interaction.reply({ content: `✅ **${user} has been kicked**` })
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: `Error: ${e}` })
        }
    }
}