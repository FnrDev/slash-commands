const { Embed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, member) => {
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const distense = Date.now() - member.user.createdTimestamp;
    const embed = new Embed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(`**${member} left the server.**`)
    .addFields(
        {
            name: "⏰ Age of account:",
            value: `\`\`${member.user.createdAt.toLocaleString()}\`\`\n**${humanizeDuration(distense, { round: true, largest: 1 })} ago**`
        },
    )
    return logChannel.send({ embeds: [embed] })
}