const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "banner",
    description: "Get user banner",
    options: [
        {
            name: "user",
            description: "user to get banner for",
            type: 3
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getString('user') || interaction.user;
        if (isNaN(user)) {
            return interaction.reply(":x: user id must be a number")
        }
        try {
            await client.users.fetch(user)
        } catch (e) {
            return interaction.reply({ content: ":x: i can\'t find this user" })
        }
        const fetchUser = await client.users.fetch(user);
        await fetchUser.fetch() // to get user banner you need to fetch user before getting banner
        const embed = new MessageEmbed()
        .setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
        .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096, format: "png" }))
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('LINK')
            .setURL(fetchUser.bannerURL({ dynamic: true, size: 4096, format: "png" }))
            .setLabel('User Banner')
        )
        interaction.reply({ embeds: [embed], components: [row] })
    }
}