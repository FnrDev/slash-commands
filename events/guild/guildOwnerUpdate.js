const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(oldGuild, newGuild) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${newGuild.name} updated ownership**`)
    .addField("Old Owner:", oldGuild.owner.user.tag)
    .addField("New Owner:", newGuild.owner.user.tag)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}