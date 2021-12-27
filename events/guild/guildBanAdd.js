const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, ban) => {
    const logChannel = await client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await ban.guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor(ban.user.tag, ban.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`**🔨 <@${ban.user.id}> banned from the server.**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(ban.guild.name, ban.guild.iconURL({ dynamic: true }))
    .addFields(
        {
            name: "Responsible Moderator:",
            value: `<@${fetchModerator.executor.id}>`,
            inline: true
        },
        {
            name: "Ban Reason:",
            value: fetchModerator.reason || '',
            inline: true
        }
    )
    logChannel.send({ embeds: [embed] })
}