const { Embed } = require('discord.js');

module.exports = async(client, member) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
    .setDescription(`**${member} has boosted ${member.guild.name} server.**`)
    .addField({ name: "Total Boosts:", value: member.guild.premiumSubscriptionCount.toString() })
    .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}