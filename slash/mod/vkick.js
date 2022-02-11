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
    category: "mod",
    run: async(interaction) => {
        const member = interaction.options.getMember('user');
        if (!member.voice.channel) {
            return interaction.reply({ content: ":x: Member not in voice channel" })
        }
        await member.voice.disconnect(`By: ${interaction.user.tag}`)
        interaction.reply(`✅ **@${member.user.username} has been kicked from voice channel**`)
    }
}