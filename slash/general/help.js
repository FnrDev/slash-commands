const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "help",
    description: "Get list of all commands or specify command",
    options: [
        {
            name: "command",
            description: "Command to get help for.",
            type: 3
        }
    ],
    run: async(interaction, client) => {
        const helpCommand = interaction.options.getString('command');
        if (helpCommand) {
            const command = client.slash.get(helpCommand.toLowerCase());
            const embed = new MessageEmbed()
            .setColor(interaction.guild.me.displayHexColor)
            if (!command) {
                const embed = new MessageEmbed()
                .setTitle(`No command for ${helpCommand.toLowerCase()}`)
                .setColor('#ff0000')
                return interaction.reply({ embeds: [embed] })
            }
            if (command.name) {
                embed.setTitle(`Command: ${command.name}`)
            }
            if (command.description) {
                embed.setDescription(command.description)
            }
            if (command.usage) {
                embed.addField('Usage:', command.usage)
            }
            if (command.example) {
                embed.addField('Examples:', command.example.replaceAll('<@>', `<@${interaction.user.id}>`))
            }
            if (command.timeout) {
                embed.addField('Timeout:', humanizeDuration(command.timeout, { round: true }))
            }
            if (command.permissions) {
                embed.addField('Require Permission:', `\`${command.permissions}\``)
            }
            return interaction.reply({ embeds: [embed] })
        } else {
            let loopAllCommads = '';
            client.slash.forEach(cmd => {
                if (!cmd.description) return;
                loopAllCommads += `**/${cmd.name}** - ${cmd.description}\n`
            })
            const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('Help Commands')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setColor(interaction.guild.me.displayHexColor)
            .setDescription(loopAllCommads)
            .setFooter(`Need more info about command use /help command`)
            interaction.reply({ embeds: [embed] })
        }
    }
}