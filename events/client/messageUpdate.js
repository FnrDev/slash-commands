const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, oldMessgae, newMessage) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    if (oldMessgae.content === newMessage.content) return;
    if (oldMessgae.content.legnth === 0) return;
    if (newMessage.content.legnth === 0) return;
    if (newMessage.author.id === client.user.id) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(newMessage.author.tag, newMessage.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`📝 **Message sent by ${newMessage.author} edited in ${newMessage.channel}.** [Jump To Message](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
    .addFields(
        {
            name: "Old:",
            value: `\`\`\`\n${oldMessgae.content}\`\`\``
        },
        {
            name: "New:",
            value: `\`\`\`\n${newMessage.content}\`\`\``
        }
    )
    return logChannel.send({ embeds: [embed] })
}