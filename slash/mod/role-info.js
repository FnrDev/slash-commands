const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
        .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
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
                name: "Role Managed?",
                value: role.managed.toString()
            },
            {
                name: "Role Created At:",
                value: `\`${role.createdAt.toLocaleString()}\`\n**${humanizeDuration(distece, { largest: 2 })} ago**`,
            },
        )
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('perms')
            .setLabel('Role Permission')
            .setEmoji('🔑')
            .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('members')
            .setLabel('Members With This Role')
            .setEmoji('👨‍👩‍👦')
            .setStyle('SECONDARY')
        )
        interaction.reply({ embeds: [embed], components: [row] })
        const filter = i => i.customId === 'perms' || 'members' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async i => {
            if (i.customId === 'perms') {
                await i.deferReply();
                const rolePerms = role.permissions.toArray().join("\n");
                return await i.editReply({ content: `**${role.name} Role Permissions:**\`\`\`\n${rolePerms}\`\`\``, embeds: [], components: [] })
            }
            if (i.customId === 'members') {
                await i.deferReply();
                const roleMembers = role.members.map(r => r.user.tag).join("\n");
                return await i.editReply({ content: `**${role.name} Members ( ${role.members.size} )** :\n\`\`\`${roleMembers}\`\`\``, embeds: [], components: [] })
            }
        })
    }
}