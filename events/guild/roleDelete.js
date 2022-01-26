const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, role) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL({ dynamic: true }) })
    .setTitle('♾️ Role Deleted')
    .setDescription(`👨‍👨‍👧 **\`${role.name}\` role has been deleted.**`)
    .setColor(role.hexColor)
    .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .addFields(
        {
            name: ":id: Role ID:",
            value: role.id,
        },
        {
            name: "Role Color:",
            value: role.hexColor
        },
        {
            name: "Responsible Moderator:",
            value: `<@${fetchModerator.executor.id}>`
        }
    )
    return logChannel.send({ embeds: [embed] })
}