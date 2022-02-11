const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async(client, oldGuild, newGuild) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${newGuild.name} updated ownership**`)
    .addField({ name: "Old Owner:", value: oldGuild.owner.user.tag })
    .addField({ name: "New Owner:", value: newGuild.owner.user.tag })
    .setTimestamp()
    return logChannel.send({ embeds: [embed] })
}