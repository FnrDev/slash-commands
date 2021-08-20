const Discord = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "server",
    description: "Get info about server",
    timeout: 3000,
    run: async(interaction) => {
        const createdServer = Date.now() - interaction.guild.createdTimestamp;
        const embed = new Discord.MessageEmbed()
        .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setColor('RANDOM')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: ":id: Server ID:",
                value: interaction.guild.id,
                inline: true
            },
            {
                name: ":calendar: Created On:",
                value: `${interaction.guild.createdAt.toLocaleString()}\n${humanizeDuration(createdServer, { largest: 1 })} ago`,
                inline: true
            },
            {
                name: ":crown: Owned By:",
                value: `<@${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: `:busts_in_silhouette: Members: (${interaction.guild.memberCount})`,
                value: `${interaction.guild.premiumSubscriptionCount} Boosts :sparkles:`,
                inline: true
            },
            {
                name: `:speech_balloon: Channels (${interaction.guild.channels.cache.size})`,
                value: `**${interaction.guild.channels.cache.filter(r => r.type == 'GUILD_TEXT').size}** | **${interaction.guild.channels.cache.filter(r => r.type == 'GUILD_VOICE').size}**`,
                inline: true
            },
            {
                name: ":earth_africa: Others",
                value: `**Verification Level:** ${interaction.guild.verificationLevel}`,
                inline: true
            },
            {
                name: `:closed_lock_with_key: Roles (${interaction.guild.roles.cache.size})`,
                value: `To see a list with all roles use **/roles**`
            }
        )
        interaction.reply({ embeds: [embed] })
    }
}