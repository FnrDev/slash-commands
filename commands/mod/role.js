const Discord = require('discord.js')

module.exports = {
    name: "role",
    description: "role someone.",
    timeout: 3000,
    options: [
        {
            name: "user",
            type: "USER",
            description: "user to give a role",
            required: true
        },
        {
            name: "role",
            type: "ROLE",
            description: "role to give to user",
            required: true
        }
    ],
    run: async(interaction, client) => {
        const user = interaction.options.getMember('user'); // access to guild member obj <https://discord.js.org/#/docs/main/stable/class/GuildMember>
        const role = interaction.options.getRole('role'); // access to role obj <https://discord.js.org/#/docs/main/stable/class/Role>
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: "You dont have permission to do this command", ephemeral: true })
        }
        let addRoles;
        if (user._roles.includes(role.id)) {
            addRoles = '-'
            user.roles.remove(role, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ Changed role for ${user}, **${addRoles}${role.name}**` })
        } else {
            addRoles = '+'
            user.roles.add(role, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ Changed role for ${user}, **${addRoles}${role.name}**` })
        }
    }
}