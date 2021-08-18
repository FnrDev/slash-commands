const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "role-info",
    description: "Display info about role",
    options: [
        {
            name: "role",
            description: "Role to display info about",
            type: 8,
            required: true
        }
    ],
    run: async(interaction) => {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        const role = interaction.options.getRole('role');
        const distece = Date.now() - role.createdTimestamp
        const embed = new MessageEmbed()
        .setColor(role.hexColor)
        .addFields(
            {
                name: "Role Name:",
                value: role.name,
            },
            {
                name: "Role ID:",
                value: role.id,
            },
            {
                name: "Role Color:",
                value: `${role.hexColor}`,     
            },
            {
                name: "Hosted?",
                value: role.hoist.toString(),       
            },
            {
                name: "Role Position:",
                value: role.position.toString(),        
            },
            {
                name: "Role Created At:",
                value: `\`${role.createdAt.toLocaleString()}\`\n**${humanizeDuration(distece, { largest: 2 })} ago**`,
            },
            {
                name: "Role Permissions (5 Permissions Only)",
                value: `\`${role.permissions.toArray().slice(0, 5).join(", ")}\``,
            }
        )
        interaction.reply({ embeds: [embed] })
    }
}