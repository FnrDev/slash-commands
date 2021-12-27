const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldState, newState) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await newState.guild.fetchAuditLogs();
    const findChannel = newState.guild.channels.cache.find(r => r.id === newState.channelId);
    if (allLogs.entries.first().action === 'MEMBER_MOVE') {
        const moveLogs = await newState.guild.fetchAuditLogs({ type: "MEMBER_MOVE" });
        const fetchModerator = moveLogs.entries.first();
        const embed = new Discord.MessageEmbed()
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(newState.guild.name, newState.guild.iconURL({ dynamic: true }))
        .setDescription(`**${newState.member} moved from \`${oldState.channel.name}\` to \`${newState.channel.name}\`**`)
        .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
        return logChannel.send({ embeds: [embed] })
    }
    if (findChannel) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(newState.guild.name, newState.guild.iconURL({ dynamic: true }))
        .setDescription(`**🔊 ${newState.member} has joined \`${findChannel.name}\` channel.**`)
        return logChannel.send({ embeds: [embed] })
    }
}