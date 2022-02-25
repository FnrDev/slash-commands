const Discord = require('discord.js');

module.exports = {
	name: 'channel-info',
	description: 'Show info about channel in this server',
	options: [
		{
			name: 'channel',
			description: 'Select channel you need info about',
			type: 7,
			required: true,
		},
	],
	category: 'general',
	/**
	 *
	 * @param {*} interaction
	 */
	run: async (interaction) => {
		const channel = interaction.options.getChannel('channel');
		const embed = new Discord.MessageEmbed().setTitle(`${channel.name} Info`);
		if (channel.isText && channel.topic) {
			embed.setDescription(channel.topic);
		}
		if (channel.rateLimitPerUser) {
			embed.addField('Slow Mode:', `${channel.rateLimitPerUser} Secounds`, true);
		}
		if (channel.parent) {
			embed.addField('Catgory Name:', channel.parent.name);
		}
		if (channel.lastPinTimestamp) {
			embed.addField('Last Pin Message At:', `<t:${Math.floor(channel.lastPinTimestamp / 1000)}:R>`, true);
		}
		if (channel.nsfw) {
			embed.addField('Channel NSFW?', 'Yes', true);
		}
		let channelTypes;
		switch (channel.type) {
			case 'GUILD_TEXT':
				channelTypes = 'Text Channel';
				break;
			case 'GUILD_VOICE':
				channelTypes = 'Voice Channel';
				break;
			case 'GUILD_CATEGORY':
				channelTypes = 'Category Channel';
				break;
			case 'GUILD_NEWS':
				channelTypes = 'News Channel';
				break;
			case 'GUILD_STORE':
				channelTypes = 'Store Channel';
				break;
			case 'GUILD_NEWS_THREAD':
				channelTypes = 'News Thread Channel';
				break;
			case 'GUILD_PUBLIC_THREAD':
				channelTypes = 'Public Thread Channel';
				break;
			case 'GUILD_PRIVATE_THREAD':
				channelTypes = 'Private Thread Channel';
				break;
			case 'GUILD_STAGE_VOICE':
				channelTypes = 'Stage Channel';
				break;
		}
		embed.addField('Channel Type:', channelTypes, true);
		embed.addField('Channel Created At:', `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, true);
		embed.setColor(interaction.guild.me.displayHexColor);
		embed.setFooter(channel.id);
		const row = new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setCustomId('members')
				.setStyle('PRIMARY')
				.setLabel('Members With Access To Channel')
				.setEmoji('👩‍👧‍👦'),
		);
		interaction.reply({
			embeds: [embed],
			components: [row],
		});
		const filter = (i) => i.customId === 'members' && i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter: filter, max: 1 });
		collector.on('collect', async (i) => {
			if (i.customId === 'members') {
				await i.deferReply();
				if (!channel.members.size) {
					return i.editReply({
						content: `:x: I can\'t find any members with access in this channel (or not cached members)`,
					});
				}
				let loopedMembers = '';
				let num = 0;
				channel.members.forEach((member) => {
					num++;
					loopedMembers += `**#${num}** | ${member}\n`;
				});
				i.editReply({
					content: `**${channel} Members:**\n\n${loopedMembers}`,
				});
			}
		});
	},
};
