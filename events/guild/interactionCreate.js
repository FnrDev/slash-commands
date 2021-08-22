const Timeout = new Set()
const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, interaction) => {
    if (!interaction.isCommand()) return;
	if (!client.commands.has(interaction.commandName)) return;
	const command = client.commands.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new MessageEmbed()
					.setTitle('You are in timeout!')
					.setDescription(`You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], content: `<@${interaction.user.id}>`, ephemeral: true })
				}
			}
			command.run(interaction, client);
				Timeout.add(`${interaction.user.id}${command.name}`)
				setTimeout(() => {
					Timeout.delete(`${interaction.user.id}${command.name}`)
				}, command.timeout);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		}
} 