const { Util, Embed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Get bot speed",
    timeout: 5000,
    category: "general",
    run: async(interaction, client) => {
        await interaction.reply('🏓 Pong!')
        const msg = await interaction.fetchReply()
        const embed = new Embed()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setColor(Util.resolveColor('Random'))
        .setTimestamp()
        .setDescription(`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms`)
        interaction.editReply({ embeds: [embed], content: null })
    }
}