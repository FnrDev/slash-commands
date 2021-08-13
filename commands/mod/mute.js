const Discord = require('discord.js');

module.exports = {
    name: "mute",
    description: "Mute a member from text channels so they cannot type",
    options: [
        {
            name: "user",
            description: "User to mute",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "Reason for mute",
            type: 3
        }
    ],
    timeout: 3000,
    run: async(interaction, client) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || '';
        if (interaction.user.id == user.id) {
            return interaction.reply({ content: ":x: You can't mute yourself" })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;
        if (authorRole <= role) {
            const embed = new MessageEmbed()
            .setTitle("I can't mute this member because that member has role position is higher than my role or same as you!")
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
        }
        if (botRole <= role) {
            const embed = new MessageEmbed()
            .setTitle("I can't mute this member because that member has role position is higher than my role or same as you!")
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
        }
        try {
            const muteRole = interaction.guild.roles.cache.find(role => role.name == 'Muted');
            if (!muteRole) {
                this.createMutedRole = await interaction.guild.roles.create({
                    name: "Muted",
                    reason: "Setup muted role for muted command"
                })
            }
            if (user.roles.cache.has(this.createMutedRole.id)) {
                return interaction.reply({ content: ":x: This user is already muted" })
            }
            interaction.guild.channels.cache.forEach((channel) => {
                channel.permissionOverwrites.edit(this.createMutedRole.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
            })
            user.roles.add(this.createMutedRole, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ **@${user.user.username} has been muted!**` })
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: "**There was an error please check my permission and role position!**" })
        }
    }
}