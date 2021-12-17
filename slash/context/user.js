const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "user-info",
    type: 3,
    run: async(interaction) => {
        const message = interaction.options.getMessage('message');
        const userCreated = Date.now() - message.author.createdTimestamp;
        const joinedTime = Date.now() - message.member.joinedTimestamp;
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addFields(
            {
                name: "User Created At:",
                value: `\`${message.author.createdAt.toLocaleString()}\`\n**${humanizeDuration(userCreated, { largest: 1 })} ago**`
            },
            {
                name: "Joined Server",
                value: `\`${message.member.joinedAt.toLocaleString()}\`\n**${humanizeDuration(joinedTime, { largest: 1 })} ago**`
            },
            {
                name: "User ID:",
                value: message.author.id
            },
            {
                name: "is it a bot?",
                value: message.author.bot.toString(),
            }
        )
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}