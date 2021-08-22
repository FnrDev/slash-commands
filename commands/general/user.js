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
        const user = interaction.options.getMember('user') || interaction.member;
        const userCreated = Date.now() - user.user.createdTimestamp;
        const joinedTime = Date.now() - user.joinedTimestamp
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addFields(
            {
                name: "User Created At:",
                value: `\`${user.user.createdAt.toLocaleString()}\`\n**${humanizeDuration(userCreated, { largest: 1 })} ago**`,
            },
            {
                name: "Joined Server",
                value: `\`${user.joinedAt.toLocaleString()}\`\n**${humanizeDuration(joinedTime, { largest: 1 })} ago**`,
            },
            {
                name: "User ID:",
                value: user.id,
            },
            {
                name: "is it a bot?",
                value: user.user.bot.toString(),
            },
            {
                name: "Avatar Link",
                value: `[Avatar URL](${user.user.displayAvatarURL({ dynamic: true })})`,
            }
        )
        interaction.reply({ embeds: [embed] })
    }
}