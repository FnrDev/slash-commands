const { Embed, Util } = require("discord.js");

module.exports = {
	name: "mute",
	description: "Mute a member from text channels so they cannot type",
	permissions: "MANAGE_MESSAGES",
	options: [
		{
			name: "user",
			description: "User to mute",
			type: 6,
			required: true,
		},
		{
			name: "reason",
			description: "Reason for mute",
			type: 3,
		},
	],
	timeout: 3000,
	category: "mod",
	run: async (interaction) => {
		const member = interaction.options.getMember("user");
		const reason = interaction.options.getString("reason") || "";
		if (interaction.user.id === member.id) {
			return interaction.reply({ content: ":x: You can't mute yourself" });
		}
		const botRole = interaction.guild.me.roles.highest.position;
		const role = member.roles.highest.position;
		const authorRole = interaction.member.roles.highest.position;
		if (authorRole <= role) {
			const embed = new Embed()
				.setTitle(
					"I can't mute this member because that member has role position is higher than my role or same as you!",
				)
				.setColor(Util.resolveColor("#ff0000"));
			return interaction.reply({ embeds: [embed] });
		}
		if (botRole <= role) {
			const embed = new Embed()
				.setTitle(
					"I can't mute this member because that member has role position is higher than my role or same as you!",
				)
				.setColor(Util.resolveColor("#ff0000"));
			return interaction.reply({ embeds: [embed] });
		}
		try {
			const muteRole = interaction.guild.roles.cache.find((role) => role.name === "Muted");
			if (!muteRole) {
				this.createMutedRole = await interaction.guild.roles.create({
					name: "Muted",
					reason: "Setup muted role for muted command",
				});
			}
			if (member.roles.cache.has(this.createMutedRole.id)) {
				return interaction.reply({ content: ":x: This user is already muted" });
			}
			interaction.guild.channels.cache.forEach((channel) => {
				channel.permissionOverwrites.edit(this.createMutedRole.id, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
				});
			});
			await member.roles.add(this.createMutedRole, `By: ${interaction.user.tag} Reason: ${reason}`);
			interaction.reply({ content: `✅ **@${member.user.username} has been muted!**` });
		} catch (e) {
			console.error(e);
			return interaction.reply({
				content: "**There was an error please check my permission and role position!**",
			});
		}
	},
};
