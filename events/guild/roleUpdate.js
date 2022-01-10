const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldRole, newRole) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" });
    const fetchModerator = await allLogs.entries.first();
    if (oldRole.color !== newRole.color) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old Color:",
                value: oldRole.hexColor
            },
            {
                name: "New Color:",
                value: newRole.hexColor
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (oldRole.name !== newRole.name) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old name:",
                value: oldRole.name
            },
            {
                name: "New name:",
                value: newRole.name
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}