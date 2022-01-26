const config = require('../../config.json');
const Discord = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, invite) => {
    const logChannel = await client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await invite.guild.fetchAuditLogs({ type: "INVITE_CREATE" });
    const fetchModerator = allLogs.entries.first();
    const inviteCreated = Date.now() - invite.createdTimestamp;
    const endInvite = Date.now() - invite.expiresTimestamp
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
    .setTitle('👩‍👧‍👦 Invite Created')
    .setDescription(`**<@${fetchModerator.executor.id}> has created a new invite for ${invite.channel} channel**`)
    .setTimestamp()
    .setFooter({ text: invite.inviter.tag, iconURL: invite.inviter.displayAvatarURL({ dynamic: true }) })
    .addFields(
        {
            name: "Invite link:",
            value: `[Invite](https://discord.gg/${invite.code})`,
            inline: true
        },
        {
            name: "Invite Created At:",
            value: `\`${invite.createdAt.toLocaleString()}\`\n**${humanizeDuration(inviteCreated, { round: true })}**`,
            inline: true
        },
        {
            name: "Invite Expires At:",
            value: humanizeDuration(endInvite, { round: true }),
            inline: true
        },
        {
            name: "Responsible Moderator:",
            value: `<@${invite.inviter.id}>`,
            inline: true
        },
        {
            name: "Max Uses:",
            value: invite.maxUses.toString(),
            inline: true
        },
    )
    return logChannel.send({ embeds: [embed] })
}