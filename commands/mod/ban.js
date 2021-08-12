const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Ban a member",
    options: [
        {
            name: "user",
            description: "User to ban",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "Reason for ban",
            type: 3,
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: "You dont have permission to do this command!", ephemeral: true })
        }
        const user = interaction.options.getMember('user');
        if (user.id == interaction.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban yourself!" })
        }
        if (user.id == client.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban me!" })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= role) {
            return interaction.reply("I can't ban this member because that member has role position is higher than my role or same as you!")
        }
        if (botRole <= role) {
            return interaction.reply("I can't ban this member because that member has role position is higher than my role or same as you!")
        }
        try {
            let reason = interaction.options.getString('reason') || '';
            await user.ban({ reason: `By: ${interaction.user.tag} | Reason: ${reason}` })
            interaction.reply({ content: `✅ **${user} has been banned**` })
        } catch (e) {
            return interaction.reply({ content: e })
        }
    }
}