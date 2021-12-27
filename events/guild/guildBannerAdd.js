const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(guild, bannerURL) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} has banner now!**`)
    .setImage(bannerURL)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}