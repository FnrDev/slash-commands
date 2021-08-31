const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldChannel, newChannel) => {
    const allLogs = await oldChannel.guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" });
    const changes = allLogs.entries.first().changes;
    const fetchModerator = allLogs.entries.first();
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    if (changes.find(r => r.key === 'topic')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL({ dynamic: true }))
        .setDescription(`**💬 Channel Updated:** \`${newChannel.name}\``)
        .setTimestamp()
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Old Topic:",
                value: changes.find(r => r.key === 'topic').old,
                inline: true
            },
            {
                name: "New Topic:",
                value: changes.find(r => r.key === 'topic').new,
                inline: true
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (changes.find(r => r.key === 'name')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL({ dynamic: true }))
        .setDescription(`**💬 Channel Updated:** \`${newChannel.name}\``)
        .setTimestamp()
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Old Name:",
                value: changes.find(r => r.key === 'name').old,
                inline: true
            },
            {
                name: "New Name:",
                value: changes.find(r => r.key === 'name').new,
                inline: true
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (changes.find(r => r.key === 'type')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL({ dynamic: true }))
        .setDescription(`**💬 Channel Updated:** \`${newChannel.name}\``)
        .setTimestamp()
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Old Type:",
                value: changes.find(r => r.key === 'type').old.toString(),
                inline: true
            },
            {
                name: "New Type:",
                value: changes.find(r => r.key === 'type').new.toString(),
                inline: true
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}