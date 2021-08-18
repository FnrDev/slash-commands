const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "banner",
    description: "Get user banner",
    options: [
        {
            name: "user",
            description: "user to get banner for",
            type: 3,
            required: true
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        const user = interaction.options.getString('user');
        if (isNaN(user)) {
            return interaction.reply(":x: user id must be a number")
        }
        try {
            await client.users.fetch(user, true)
        } catch (e) {
            return interaction.reply({ content: ":x: i can\'t find this user" })
        }
        const fetchUser = await client.users.fetch(user);
        const req = await axios({
            url: `https://discord.com/api/v9/users/${fetchUser.id}`,
            method: "GET",
            headers: {
                Authorization: `Bot ${client.token}`
            },
        })
        const data = req.data;
        if (!data.banner) {
            return interaction.reply({ content: ":x: i can\'t find banner in this user" })
        }
        let end;
        if (data.banner.startsWith('a_')) {
            end = 'gif'
        } else {
            end = 'png'
        }
        const embed = new MessageEmbed()
        .setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
        .setImage(`https://cdn.discordapp.com/banners/${fetchUser.id}/${data.banner}.${end}?size=2048`)
        .setDescription(`[Banner Link](https://cdn.discordapp.com/banners/${fetchUser.id}/${data.banner}.${end}?size=2048)`)
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed] })
    }
}