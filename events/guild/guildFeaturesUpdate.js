const { Embed } = require('discord.js');

module.exports = async(client, oldGuild, newGuild) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${newGuild.name} features has been updated.**`)
    .addField({ name: "Old Features:", value: oldGuild.features.join(", ") })
    .addField({ name: "New Features:", value: newGuild.features.join(", ") })
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}