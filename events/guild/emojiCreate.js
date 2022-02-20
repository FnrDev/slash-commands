const { Embed } = require('discord.js');

module.exports = async(client, emoji) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const fetchEmojiAuthor = await emoji.fetchAuthor();
    const embed = new Embed()
    .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
    .setTitle('🥳 Emoji Created')
    .setDescription(`**${fetchEmojiAuthor} has created <:${emoji.name}:${emoji.id}> emoji!**`)
    .setThumbnail(emoji.url)
    .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .addFields(
        {
            name: "Responsible Moderator:",
            value: `<@${fetchEmojiAuthor.id}>`
        },
    )
    return logChannel.send({ embeds: [embed] })
}