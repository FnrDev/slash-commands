const Discord = require('discord.js');

module.exports = {
    name: "moveme",
    description: "Moves you to another voice channel",
    options: [
        {
            name: "channel",
            description: "Channel to move to",
            type: 7,
            required: true
        }
    ],
    timeout: 5000,
    /**
     * 
     * @param { Discord.CommandInteraction } interaction 
     */
    run: async(interaction) => {
        const channel = interaction.options.getChannel('channel');
        if (!interaction.member.voice.channel) {
            return interaction.reply({ content: ":x: You need to be in voice channel", ephemeral: true })
        }
        if (channel.type !== 'GUILD_VOICE') {
            return interaction.reply({ content: ":x: Channel type must be a voice channel", ephemeral: true })
        }
        if (interaction.member.voice.channel.id === channel.id) {
            return interaction.reply({ content: `:x: You are already in ${channel.name} channel`, ephemeral: true })
        }
        await interaction.member.voice.setChannel(channel, `By Moveme command`);
        interaction.reply({ content: `✅ **Moved to ${channel.name} **` })
    }
}