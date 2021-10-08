module.exports = {
    name: "move",
    description: "Move user from channel to another channel",
    permissions: "MOVE_MEMBERS",
    options: [
        {
            name: "user",
            description: "User to move to another channel.",
            type: 6,
            required: true
        },
        {
            name: "channel",
            description: "Channel to move the user to.",
            type: 7
        }
    ],
    run: async(interaction) => {
        const member = interaction.options.getMember('user');
        const channel = interaction.options.getChannel('channel');
        if (!member.voice.channel) {
            return interaction.reply({ content: ":x: Member must be in voice channel" })
        }
        if (interaction.user.id === member.user.id) {
            return interaction.reply({ content: `✅ **${member.user.username} already in the voice channel!**` })
        }
        if (!channel) {
            await member.voice.setChannel(interaction.member.voice.channel, `By: ${interaction.user.tag}`);
            return interaction.reply({ content: `**✅ ${member.user.username} moved to ${interaction.member.voice.channel.name}**` })
        }
        if (channel.type !== 'GUILD_VOICE') {
            return interaction.reply({ content: ":x: Channel must be a voice channel" })
        }
        await member.voice.setChannel(channel, `By: ${interaction.user.tag}`);
        interaction.reply({ content: `✅ **${member.user.username} moved to ${channel.name}**` })
    }
}