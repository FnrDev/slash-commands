const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = {
	name: 'help',
	description: 'Get list of all bot commands',
	options: [
		{
			name: 'command',
			description: 'Command you need help for',
			type: 3,
		},
	],
	usage: '/ping',
	category: 'general',
	run: async (interaction, client) => {
		try {
			const command = interaction.options.getString('command');
			if (command) {
				const cmd = client.commands.get(command.toLowerCase());
				if (!cmd) {
					return interaction.reply({ content: `I can\'t find \`${command}\` command`, ephemeral: true });
				}
				const embed = new MessageEmbed().setColor(interaction.guild.me.displayHexColor);
				if (cmd.name) {
					embed.setTitle(`Command: ${cmd.name}`);
				}
				if (cmd.description) {
					embed.setDescription(cmd.description);
				}
				if (cmd.usage) {
					embed.addField('Usage:', cmd.usage);
				}
				if (cmd.timeout) {
					embed.addField('Timeout:', humanizeDuration(cmd.timeout, { round: true }));
				}
				return interaction.reply({ embeds: [embed] });
			}
			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('help_menu')
					.setPlaceholder('Select Command Category.')
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'Fun',
							description: 'Show all commands in fun category.',
							emoji: '😂',
							value: 'fun',
						},
						{
							label: 'General',
							description: 'Show all commands in general category.',
							emoji: '🔎',
							value: 'general',
						},
						{
							label: 'Mod',
							description: 'Show all commands in mod category.',
							emoji: '🔨',
							value: 'mod',
						},
					]),
			);
			interaction.reply({ content: '**👋 Select Category You Need Help For**', components: [row] });
			const filter = (i) => i.customId === 'help_menu' || ('selected_command' && i.user.id === interaction.user.id);
			const collector = interaction.channel.createMessageComponentCollector({
				filter: filter,
				max: 2,
				componentType: 'SELECT_MENU',
			});
			collector.on('collect', async (i) => {
				if (i.values.includes('fun')) {
					await i.deferUpdate();
					const loopArray = [];
					const funCommands = client.slash.filter((r) => r.category === 'fun');
					if (funCommands.size > 25) {
						loopArray.slice(0, 25);
					}
					funCommands.forEach((cmd) => {
						loopArray.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '😂',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
							.setCustomId('fun_cmd')
							.setPlaceholder('Info Commands')
							.setMinValues(1)
							.setMaxValues(1)
							.addOptions(loopArray),
					);
					return i.editReply({
						content: '**😂 Select what command you need help for.**',
						components: [commandRow],
					});
				}
				if (i.values.includes('general')) {
					await i.deferUpdate();
					const loopGeneralCommands = [];
					const generalCommands = client.slash.filter((r) => r.category === 'general');
					if (generalCommands.size > 25) {
						loopGeneralCommands.slice(0, 25);
					}
					generalCommands.forEach((cmd) => {
						loopGeneralCommands.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '🔎',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
							.setCustomId('general_cmd')
							.setPlaceholder('General Commands')
							.setMinValues(1)
							.setMaxValues(1)
							.addOptions(loopGeneralCommands),
					);
					return i.editReply({
						content: '**🔎 Select what command you need help for.**',
						components: [commandRow],
					});
				}
				if (i.values.includes('mod')) {
					await i.deferUpdate();
					const loopModCommands = [];
					const modCommands = client.slash.filter((r) => r.category === 'mod');
					if (modCommands.size > 25) {
						loopModCommands.slice(0, 25);
					}
					modCommands.forEach((cmd) => {
						loopModCommands.push({
							label: cmd.name,
							value: cmd.name,
							description: cmd.description,
							emoji: '🔨',
						});
					});
					const commandRow = row.setComponents(
						new MessageSelectMenu()
							.setCustomId('mod_cmd')
							.setPlaceholder('Mod Commands')
							.setMinValues(1)
							.setMaxValues(1)
							.addOptions(loopModCommands),
					);
					return i.editReply({
						content: '**🔨 Select what command you need help for.**',
						components: [commandRow],
					});
				}
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	},
};
