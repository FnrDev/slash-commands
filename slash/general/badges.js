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
    }
}