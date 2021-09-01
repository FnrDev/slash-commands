const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, invite) => {
    const logChannel = await client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await invite.guild.fetchAuditLogs({ type: "INVITE_DELETE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor(invite.guild.name, invite.guild.iconURL({ dynamic: true }))
    .setTitle('👩‍👧‍👦 Invite Deleted')
    .setDescription(`**<@${fetchModerator.executor.id}> has deleted a invite for ${invite.channel} channel**`)
    .setTimestamp()
    .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
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