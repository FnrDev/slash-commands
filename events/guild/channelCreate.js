const config = require('../../config.json');
const Discord = require('discord.js')

module.exports = async(client, channel) => {
    const allLogs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" });
    const fetchLogs = allLogs.entries.first();
    const logChannel = await client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
    .setTitle('🏚 Channel Created')
    .setDescription(`💬 **Channel Name:** \`${channel.name}\`\n:id: **Channel ID:** \`${channel.id}\`\n🔨 **Channel Type:** \`${channel.type}\``)
    .addField('Responsible Moderator:', `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`)
    .setTimestamp()
    .setFooter({ text: fetchLogs.executor.tag, iconURL: fetchLogs.executor.displayAvatarURL({ dynamic: true }) })
    logChannel.send({ embeds: [embed] })
}