const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "badges",
    description: "Get list of members with badges",
    options: [
        {
            name: "badge",
            description: "Badge you want to get list of members for",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Discord Staff",
                    value: "staff"
                },
                {
                    name: "Discord Partnerd",
                    value: "partnerd"
                },
                {
                    name: "Hypesquad Events",
                    value: "HYPESQUAD_EVENTS"
                },
                {
                    name: "Bug Hunter Level 1",
                    value: "BUGHUNTER_LEVEL_1"
                },
                {
                    name: "House Bravery",
                    value: "HOUSE_BRAVERY"
                },
                {
                    name: "Early Supporter",
                    value: "EARLY_SUPPORTER"
                },
                {
                    name: "Bug Hunter Level 2",
                    value: "BUGHUNTER_LEVEL_2"
                },
                {
                    name: "Verified Bot",
                    value: "VERIFIED_BOT"
                },
                {
                    name: "Early Verified Bot Developer",
                    value: "EARLY_VERIFIED_BOT_DEVELOPER"
                },
                {
                    name: "Discord Certified Moderator",
                    value: "DISCORD_CERTIFIED_MODERATOR"
                }
            ]
        }
    ],
    run: async(interaction, client) => {
        const badges = interaction.options.getString('badge');
        if (badges === 'staff') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_EMPLOYEE')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Early Developer Badge\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_EMPLOYEE'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_EMPLOYEE')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_EMPLOYEE')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'partnerd') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('PARTNERED_SERVER_OWNER')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Partnerd Badge\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('PARTNERED_SERVER_OWNER'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('PARTNERED_SERVER_OWNER')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('PARTNERED_SERVER_OWNER')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'HYPESQUAD_EVENTS') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('HYPESQUAD_EVENTS')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`HypeSquad Events\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('HYPESQUAD_EVENTS'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('HYPESQUAD_EVENTS')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('HYPESQUAD_EVENTS')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'BUGHUNTER_LEVEL_1') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_1')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Bug Hunter Level 1\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_1'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_1')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_1')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'HOUSE_BRAVERY') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('HOUSE_BRAVERY')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`House Bravery\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('HOUSE_BRAVERY'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('HOUSE_BRAVERY')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('HOUSE_BRAVERY')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'EARLY_SUPPORTER') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_SUPPORTER')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Early Supporter\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_SUPPORTER'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_SUPPORTER')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_SUPPORTER')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'BUGHUNTER_LEVEL_2') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_2')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Bug Hunter Level 2\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_2'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_2')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('BUGHUNTER_LEVEL_2')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'VERIFIED_BOT') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('VERIFIED_BOT')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Verified Bot\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('VERIFIED_BOT'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('VERIFIED_BOT')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('VERIFIED_BOT')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'EARLY_VERIFIED_BOT_DEVELOPER') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_VERIFIED_BOT_DEVELOPER')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Early Verified Bot Developer\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_VERIFIED_BOT_DEVELOPER'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_VERIFIED_BOT_DEVELOPER')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('EARLY_VERIFIED_BOT_DEVELOPER')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
        if (badges === 'DISCORD_CERTIFIED_MODERATOR') {
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_CERTIFIED_MODERATOR')).size === 0) {
                return interaction.reply({ content: ":x: No one in this server has \`Discord Certified Moderator\`" })
            }
            if (interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_CERTIFIED_MODERATOR'))) {
                const filterBadges = interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_CERTIFIED_MODERATOR')).map(r => r.user).join("\n");
                interaction.reply({ content: `There are **${interaction.guild.members.cache.filter(r => r.user.flags?.has('DISCORD_CERTIFIED_MODERATOR')).size}** members with this badge\n\n${filterBadges}` })
            }
        }
    }
}