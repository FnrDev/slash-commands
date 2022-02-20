const { Embed } = require('discord.js');

module.exports = async(client, ban) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const allLogs = await ban.guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Embed()
    .setAuthor({ name: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**🔨 <@${ban.user.id}> banned from the server.**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
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