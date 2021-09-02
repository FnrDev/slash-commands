const config = require('../../config.json');
const Discord = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, member) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const fetchInviter = await member.guild.invites.fetch({ cache: false })
    const invite = fetchInviter.first()
    const distense = Date.now() - member.user.createdTimestamp;
    const embed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(`**${member} joined the server.**`)
    .addFields(
        {
            name: "⏰ Age of account:",
            value: `\`\`${member.user.createdAt.toLocaleString()}\`\`\n**${humanizeDuration(distense, { round: true, largest: 1 })} ago**`
        },
        {
            name: "Inviter:",
            value: `<@${invite.inviter.id}>` || `<@${member.guild.ownerId}>`
        },
        {
            name: "Invite Code:",
            value: invite.code || 'unknown'
        }
    )
    return logChannel.send({ embeds: [embed] })
}