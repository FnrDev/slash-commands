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
                value: `**${interaction.guild.channels.cache.filter(r => r.type == 'GUILD_TEXT').size} Text** | **${interaction.guild.channels.cache.filter(r => r.type == 'GUILD_VOICE').size} Voice**`,
                inline: true
            },
            {
                name: ":earth_africa: Others",
                value: `**Verification Level:** ${interaction.guild.verificationLevel}`,
                inline: true
            },
        )
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('roles')
            .setStyle('PRIMARY')
            .setEmoji('🔒')
            .setLabel('Sever Roles')
        )
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('channels')
            .setEmoji('💬')
            .setStyle('SUCCESS')
            .setLabel('Text Channels')
        )
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('voice')
            .setEmoji('🔊')
            .setStyle('PRIMARY')
            .setLabel('Voice Channels')
        )
        interaction.reply({ embeds: [embed], components: [row] })
        try {
            const filter = i => i.customId === 'roles' || 'channels' || 'voice' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter: filter });
            collector.on('collect', async i => {
                if (i.customId === 'roles') {
                    await i.deferReply();
                    const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.name).join("\n");
                    return await i.editReply({ content: `**${interaction.guild.name} Roles:**\`\`\`\n${roles}\`\`\``, embeds: [], components: [] })
                }
                if (i.customId === 'channels') {
                    await i.deferReply();
                    const mapChannels = interaction.guild.channels.cache.sort((a, b) => a.position - b.position).filter(r => r.type === 'GUILD_TEXT').map(r => r.name).join("\n");
                    return await i.editReply({ content: `**${interaction.guild.name} Text Channels:**\`\`\`\n${mapChannels}\`\`\``, embeds: [], components: [] });
                }
                if (i.customId === 'voice') {
                    await i.deferReply();
                    const mapVoiceChannels = interaction.guild.channels.cache.sort((a, b) => a.position - b.position).filter(r => r.type === 'GUILD_VOICE').map(r => r.name).join("\n");
                    return await i.editReply({ content: `**${interaction.guild.name} Voice Channels**\`\`\`\n${mapVoiceChannels}\`\`\``, embeds: [], components: []  })
                }
            })
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`)
            })
        } catch (e) {
            console.error(e)
        }
    }
}