const config = require('../../config.json');
const { Embed } = require('discord.js');

module.exports = async(client, oldEmoji, newEmoji) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const fetchEmojiAuthor = await newEmoji.fetchAuthor();
    if (oldEmoji.name !== newEmoji.name) {
        const embed = new Embed()
        .setAuthor({ name: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
        .setTitle('🤩 Emoji Updated')
        .setDescription(`**${fetchEmojiAuthor} has updated <:${newEmoji.name}:${newEmoji.id}> emoji**`)
        .addFields(
            {
                name: "Old name:",
                value: oldEmoji.name
            },
            {
                name: "New name:",
                value: newEmoji.name
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchEmojiAuthor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}