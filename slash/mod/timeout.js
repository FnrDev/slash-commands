const ms = require('ms');

module.exports = {
    name: "timeout",
    description: "Timeout user from typing or joining voice channel or react to messages",
    options: [
        {
            name: "user",
            description: "User to timeout.",
            type: 6,
            required: true
        },
        {
            name: "time",
            description: "Time for user to timeout in minutes.",
            type: 4,
            required: true
        }
    ],
    permissions: "MODERATE_MEMBERS",
    run: async(interaction) => {
        const member = interaction.options.getMember('user');
        const time = interaction.options.getInteger('time');
       await member.disableCommunicationUntil(Date.now() + (time * 60 * 1000), `By: ${interaction.user.tag}`).catch(console.error);
       interaction.reply({
           content: `${member} has been timeout for **${time}** minutes`
       })
    }
}