const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "role",
    description: "role someone.",
    timeout: 3000,
    options: [
        {
            name: "user",
            type: 6, // type has been changed check <https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type>
            description: "user to give a role",
            required: true
        },
        {
            name: "role",
            type: 8, // type has been changed check <https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type>
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
        const botRole = interaction.guild.me.roles.highest.position;
        const roleToGet = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= roleToGet) {
            const embed = new MessageEmbed()
            .setTitle("I can't role this member because that member has role position is higher than my role or same as you!")
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
        }
        if (botRole <= roleToGet) {
            const embed = new MessageEmbed()
            .setTitle("I can't role this member because that member has role position is higher than my role or same as you!")
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
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