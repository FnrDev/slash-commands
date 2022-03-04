const Timeout = new Set()
const { Embed, Util } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, interaction) => {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.slash.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new MessageEmbed()
					.setTitle('You are in timeout!')
					.setDescription(`You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new MessageEmbed()
					.setTitle('Missing Permission')
					.setDescription(`:x: You need \`${command.permissions}\` to use this command`)
					.setColor('#ff0000')
					.setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.devs) {
				if (!process.env.OWNERS.includes(interaction.user.id)) {
					return interaction.reply({ content: ":x: Only devs can use this command", ephemeral: true });
				}
			}
			if (command.ownerOnly) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					return interaction.reply({ content: "Only ownership of this server can use this command", ephemeral: true })
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
	if (interaction.isSelectMenu()) {
		const commandsCustomIDs = [
			"fun_cmd",
			"general_cmd",
			"mod_cmd"
		];
		if (commandsCustomIDs.includes(interaction.customId)) {
			const selectedValues = interaction.values;
			const command = client.slash.find(r => r.name === selectedValues[0]);
			if (selectedValues.includes(command.name)) {
				const embed = new Embed()
				.setColor(Util.resolveColor(interaction.guild.me.displayHexColor))
				.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
				if (command.name) {
					embed.setTitle(`Command: ${command.name}`)
				}
				if (command.description) {
					embed.setDescription(command.description)
				}
				if (command.example) {
					embed.addField({ name: "Example", value: command.example.replaceAll('<@>', interaction.user) })
				}
				if (command.usage) {
					embed.addField({ name: 'Usage:', value: command.usage })
				}
				if (command.timeout) {
					embed.addField({ name: 'Timeout:', value: humanizeDuration(command.timeout, { round: true }) })
				}
				interaction.message.edit({
					embeds: [embed],
					ephemeral: true
				});
			}
		}
	}
	if (interaction.isModalSubmit()) {
		if (interaction.customId === 'bug_form') {
			const bugTitle = interaction.fields.getTextInputValue('bug_title');
			const bugDescription = interaction.fields.getTextInputValue('bug_description');
			const bugChannel = client.channels.cache.get('879056423751934033');
			bugChannel.send({
				content: `New bug:\n**Bug Title:** ${bugTitle}\n**Bug Description:** ${bugDescription}`
			})
			interaction.reply(`👋 Thanks for reporting for this bug, our staff will check this bug and will reply to you as soon as posiable.`)
		}
	}
} 