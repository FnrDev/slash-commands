const { Embed } = require('discord.js');

module.exports = async(client, invite) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const allLogs = await invite.guild.fetchAuditLogs({ type: "INVITE_DELETE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Embed()
    .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
    .setTitle('👩‍👧‍👦 Invite Deleted')
    .setDescription(`**<@${fetchModerator.executor.id}> has deleted a invite for ${invite.channel} channel**`)
    .setTimestamp()
    .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
    .addFields(
        {
            name: "Invite link:",
            value: `[Invite](https://discord.gg/${invite.code})`,
            inline: true
        },
        {
            name: "Invite Code:",
            value: invite.code,
            inline: true
        },
        {
            name: "Responsible Moderator:",
            value: `<@${fetchModerator.executor.id}>`,
            inline: true
        },
    )
    return logChannel.send({ embeds: [embed] })
}