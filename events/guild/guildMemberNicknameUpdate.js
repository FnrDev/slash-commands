const { Embed } = require('discord.js');

module.exports = async(client, member, oldNickname, newNickname) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const embed = new Embed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
    .setDescription(`**${member} nickname has been changed.**`)
    .addFields(
        {
            name: "🏁 Old Nickname:",
            value: oldNickname || 'No Nickname'
        },
        {
            name: "🏁 New Nickname:",
            value: newNickname || 'No Nickname'
        }
    )
    logChannel.send({
        embeds: [embed]
    })
}