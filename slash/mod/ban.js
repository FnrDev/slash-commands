const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Ban a member",
    permissions: "BAN_MEMBERS",
    example: `/ban <@>\n/ban <@> spamming`,
    options: [
        {
            name: "user",
            description: "User to ban",
            type: 6,
            required: true
        }
    ],
    timeout: 3000,
    category: "mod",
    run: async(interaction, client) => {
        const member = interaction.options.getMember('user');
        if (member.id === interaction.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban yourself!", ephemeral: true })
        }
        if (member.id === client.user.id) {
            return interaction.reply({ content: ":x: You can\'t ban me!", ephemeral: true })
        }
        if (!member.banable) {
            return interaction.reply({ content: "i can\'t ban this user", ephemeral: true })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = member.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= role) {
            return interaction.reply({ content: `🙄 **You can\'t ban @${member.user.username}**`, ephemeral: true })
        }
        if (botRole <= role) {
            return interaction.reply({ content: `🙄 **You can\'t ban @${member.user.username}**`, ephemeral: true })
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
                        reason = i.values[0] // Get first option from select menu
                        await member.ban({ reason: `By: ${interaction.user.tag} | Reason: ${reason}`, days: 7 })
                        console.log('hello7')
                        return interaction.editReply({ content: `✅ **${member} has been banned**`, components: [] })      
                    }
                })
        } catch (e) {
            console.error(e)
            return interaction.reply({ content: "Please check my permissions and role position" })
        }
    }
}