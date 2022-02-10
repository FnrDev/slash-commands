const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async(client, guild, oldURL, newURL) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} has chnaged a vanity url from [oldURL](${oldURL}) to [newURL](${newURL})**`)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}