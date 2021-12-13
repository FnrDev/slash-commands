const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Get user avatar",
    options: [
        {
            name: "user",
            description: "User to get avatar",
            type: 6,
        }
    ],
    category: "general",
    run: async(interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`[Avatar Link](${user.displayAvatarURL({ dynamic: true, size: 4096 })})`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed] })
    }
}