const { Embed } = require('discord.js');

module.exports = async(guild, bannerURL) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} has banner now!**`)
    .setImage(bannerURL)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}