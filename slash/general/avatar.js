const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Get user avatar",
    options: [
        {
            name: "user",
            description: "User to get avatar",
            type: 6,
        },
        {
            name: "server_avatar",
            description: "Get member avatar in this server",
            type: 5,
        }
    ],
    category: "general",
    run: async(interaction) => {
        const member = interaction.options.getMember('user') || interaction.member;
        const isMemberAvatar = interaction.options.getBoolean('server_avatar');
        if (isMemberAvatar) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.avatarURL({ dynamic: true }))
            .setDescription(`[Avatar Link](${member.avatarURL({ dynamic: true, size: 4096 })})`)
            .setImage(member.avatarURL({ dynamic: true, size: 4096 }))
            .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            return interaction.reply({ embeds: [embed] })
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`[Avatar Link](${member.user.displayAvatarURL({ dynamic: true, size: 4096 })})`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed] })
    }
}