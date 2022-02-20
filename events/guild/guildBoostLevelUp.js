const { Embed } = require('discord.js');

module.exports = async(client, guild, oldLevel, newLevel) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
    .setDescription(`**↖ ${guild.name} reaches new boost level.**`)
    .addField({ name: "Old Level:", value: oldLevel.toString() })
    .addField({ name: "New Level:", value: newLevel.toString() })
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}