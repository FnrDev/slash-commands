const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, member, oldNickname, newNickname) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const embed = new Discord.MessageEmbed()
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
}