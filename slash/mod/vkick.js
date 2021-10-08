module.exports = {
    name: "vkick",
    permissions: "MANAGE_CHANNELS",
    description: "Kick a member from voice channel.",
    options: [
        {
            name: "user",
            description: "User to kick from voice",
            type: 6,
            required: true
        }
    ],
    run: async(interaction) => {
        const user = interaction.options.getMember('user');
        if (!user.voice.channel) {
            return interaction.reply({ content: ":x: Member not in voice channel" })
        }
        await user.voice.disconnect(`By: ${interaction.user.tag}`)
        interaction.reply(`✅ **@${user.user.username} has been kicked from voice channel**`)
    }
}