const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, guild, oldLevel, newLevel) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
    .setDescription(`**↖ ${guild.name} reaches new boost level.**`)
    .addField("Old Level:", oldLevel.toString())
    .addField("New Level:", newLevel.toString())
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}