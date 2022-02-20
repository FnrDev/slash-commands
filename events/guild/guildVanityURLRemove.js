const { Embed } = require('discord.js');

module.exports = async(client, guild, vanityURL) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} has removed a vanity url** [URL](${vanityURL})`)
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}