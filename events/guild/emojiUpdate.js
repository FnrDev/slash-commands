const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldEmoji, newEmoji) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await newEmoji.guild.fetchAuditLogs({ type: "EMOJI_UPDATE" });
    const changes = allLogs.entries.first().changes;
    console.log(changes)
    const fetchEmojiAuthor = await newEmoji.fetchAuthor();
    if (changes.find(r => r.key === 'name')) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(newEmoji.guild.name, newEmoji.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(fetchEmojiAuthor.tag, fetchEmojiAuthor.displayAvatarURL({ dynamic: true }))
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