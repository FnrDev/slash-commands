const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldRole, newRole) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" });
    const fetchModerator = await allLogs.entries.first();
    const changes = fetchModerator.changes;
    if (changes.find(r => r.key === 'color')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newRole.guild.name, newRole.guild.iconURL({ dynamic: true }))
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addFields(
            {
                name: "Old Color:",
                value: changes.find(r => r.key === 'color').old.toString()
            },
            {
                name: "New Color:",
                value: changes.find(r => r.key === 'color').new.toString()
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (changes.find(r => r.key === 'name')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newRole.guild.name, newRole.guild.iconURL({ dynamic: true }))
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addFields(
            {
                name: "Old name:",
                value: changes.find(r => r.key === 'name').old
            },
            {
                name: "New name:",
                value: changes.find(r => r.key === 'name').new
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (changes.find(r => r.key === 'permissions')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newRole.guild.name, newRole.guild.iconURL({ dynamic: true }))
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addFields(
            {
                name: "New permissions:",
                value: newRole.permissions.toArray().join("\n")
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}