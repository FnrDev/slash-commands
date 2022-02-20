const { Embed } = require('discord.js');

module.exports = async(client, guild) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} is on longer partnered!**`)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}