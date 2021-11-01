const Discord = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "user",
    description: "Get info about user like created at..",
    timeout: 3000,
    options: [
        {
            name: "user",
            description: "User to get info about",
            type: 6,
        }
    ],
    run: async(interaction) => {
        const member = interaction.options.getMember('user') || interaction.member;
        const userCreated = Date.now() - member.user.createdTimestamp;
        const joinedTime = Date.now() - member.joinedTimestamp;
        const memberAvatar = member.avatarURL({ dynamic: true }) || member.user.displayAvatarURL({ dynamic: true });
        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(memberAvatar)
        .setFooter(member.id, member.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addFields(
            {
                name: "User Created At:",
                value: `\`${member.user.createdAt.toLocaleString()}\`\n**${humanizeDuration(userCreated, { largest: 1 })} ago**`,
            },
            {
                name: "Joined Server",
                value: `\`${member.joinedAt.toLocaleString()}\`\n**${humanizeDuration(joinedTime, { largest: 1 })} ago**`,
            },
            {
                name: "User Roles:",
                value: member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r.toString()).join(", ")
            },
            {
                name: "User Nickname:",
                value: member.nickname || 'None'
            },
            {
                name: "is it a bot?",
                value: member.user.bot ? "✅" : ":x:",
            }
        )
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setStyle('LINK')
            .setURL(member.user.displayAvatarURL({ dynamic: true }))
            .setLabel('User Avatar')
        )
        interaction.reply({ embeds: [embed], components: [row] })
    }
}