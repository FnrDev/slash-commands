const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: "info",
    description: "Get info about bot",
    timeout: 3000,
    run: async(interaction, client) => {
        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setURL('https://github.com/FnrDev/slash-commands')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Total Servers:",
                value: `${client.guilds.cache.size} Guilds`,
                inline: true
            },
            {
                name: "Total Users:",
                value: `${client.users.cache.size} Users`,
                inline: true
            },
            {
                name: "Total Channels:",
                value: `${client.channels.cache.size} Channels`,
                inline: true
            },
            {
                name: "You can get me at:",
                value: `[Link](https://github.com/FnrDev/slash-commands)`,
                inline: true
            }
        )
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('LINK')
            .setURL('https://github.com/FnrDev/slash-commands')
            .setLabel('Click Me')
        )
        interaction.reply({ embeds: [embed], components: [row] })
    }
}