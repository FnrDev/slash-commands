const { Embed } = require('discord.js');

module.exports = async(client, channel, oldTopic, newTopic) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL({ dynamic: true }) })
    .addFields(
        {
            name: "📝 Old Topic:",
            value: oldTopic || 'None'
        },
        {
            name: "📝 New Topic",
            value: newTopic || 'None'
        }
    )
    .setTimestamp()
   return logChannel.send({ embeds: [embed] });
}