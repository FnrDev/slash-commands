const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async(client, oldGuild, newGuild) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await newGuild.fetchAuditLogs({ type: "GUILD_UPDATE" });
    const fetchModerator = allLogs.entries.first();
    console.log(fetchModerator)
    if (fetchModerator.changes.map(r => r.key === 'name')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newGuild.name, newGuild.iconURL({ dynamic: true }))
        .setDescription(`<@${fetchModerator.executor.id}> Updated \`${fetchModerator.changes.map(r => r.key)}\``)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addField('Old Name:', oldGuild.name, true)
        .addField('New Name:', newGuild.name, true)
        return logChannel.send({ embeds: [embed] })
    }
    if (fetchModerator.changes.map(r => r.key === 'icon_hash')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newGuild.name, newGuild.iconURL({ dynamic: true }))
        .setDescription(`<@${fetchModerator.executor.id}> Updated \`${fetchModerator.changes.map(r => r.key)}\``)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addField('Old Icon:', `[Link](${oldGuild.iconURL({ dynamic: true })})`, true)
        .addField('New Icon:', `[Link](${newGuild.iconURL({ dynamic: true })})`, true)
        return logChannel.send({ embeds: [embed] })
    }
    if (fetchModerator.changes.map(r => r.key === 'verification_level')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newGuild.name, newGuild.iconURL({ dynamic: true }))
        .setDescription(`<@${fetchModerator.executor.id}> Updated \`${fetchModerator.changes.map(r => r.key)}\``)
        .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addField('Old Verification Level', fetchModerator.changes.map(r => r.old).toString(), true)
        .addField('New Verification Level', fetchModerator.changes.map(r => r.new).toString(), true)
        return logChannel.send({ embeds: [embed] })
    }
}