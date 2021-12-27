const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, member) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
    .setDescription(`**${member} has unboosted ${member.guild.name} server.**`)
    .addField("Total Boosts:", member.guild.premiumSubscriptionCount.toString())
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}