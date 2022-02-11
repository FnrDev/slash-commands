const { ActionRow, ButtonComponent, Embed, Util, ButtonStyle } = require('discord.js')

module.exports = {
    name: "bot",
    description: "Get info about bot",
    timeout: 3000,
    category: "general",
    run: async(interaction, client) => {
        const embed = new Embed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(Util.resolveColor('Random'))
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
        const row = new ActionRow()
        .addComponents(
            new ButtonComponent()
            .setStyle(ButtonStyle.Link)
            .setURL('https://github.com/FnrDev/slash-commands')
            .setLabel('Click Me')
        )
        interaction.reply({ embeds: [embed], components: [row] })
    }
}