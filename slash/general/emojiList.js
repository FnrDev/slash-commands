const Discord = require('discord.js');

module.exports = {
    name: "emojis",
    description: "Get a list of emojis",
    category: "general",
    run: async(interaction) => {
        const emojis = interaction.guild.emojis.cache.map(r => r).join(" ");
        const embed = new Discord.Embed()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTitle(`${interaction.guild.emojis.cache.filter(r => r.animated === false).size} Emotes, ${interaction.guild.emojis.cache.filter(r => r.animated).size} Animated (${interaction.guild.emojis.cache.size} Total)`)
        .setDescription(emojis.toString())
        .setColor(Discord.Util.resolveColor('Random'))
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        return interaction.reply({ embeds: [embed] })
    }
}