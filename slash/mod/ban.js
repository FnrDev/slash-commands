const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Ban a member",
    options: [
        {
            name: "user",
            description: "User to ban",
            type: 6,
            required: true
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: "You dont have permission to do this command!", ephemeral: true })
        }
        const user = interaction.options.getMember('user');
        if (user.id === interaction.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban yourself!" })
        }
        if (user.id === client.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban me!" })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= role) {
            return interaction.reply(`🙄 **You can\'t ban @${user.user.username}**`)
        }
        if (botRole <= role) {
            return interaction.reply(`🙄 **You can\'t ban @${user.user.username}**`)
        }
        try {
            let reason;
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                    .setCustomId('reason')
                    .setPlaceholder('Select a reason')
                    .addOptions([
                        {
                            label: 'Spaming',
                            value: "spaming"
                        },
                        {
                            label: "Adv",
                            value: "adv"
                        }
                    ])
                )
                interaction.reply({ content: "**Select a reason:**", components: [row] });
                const filter = i => i.customId === 'reason' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter: filter })
                collector.on('collect', async i => {
                    if (i.customId === 'reason') {
                        reason = i.values[0]
                        await user.ban({ reason: `By: ${interaction.user.tag} | Reason: ${reason}`, days: 7 })
                        return interaction.editReply({ content: `✅ **${user} has been banned**`, components: [] })
                    }
                })
        } catch (e) {
            return interaction.reply({ content: e })
        }
    }
}