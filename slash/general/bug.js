const { ActionRow, TextInputComponent, TextInputStyle, Modal } = require("discord.js");

module.exports = {
	name: "bug",
	description: "submit a bug",
	run: async (interaction) => {
		const modal = new Modal().setTitle("Bugs form").setCustomId("bug_form");

		const bugTitle = new TextInputComponent()
			.setCustomId("bug_title")
			.setLabel("Bug Title")
			.setStyle(TextInputStyle.Short)

		const bugDescription = new TextInputComponent()
			.setCustomId("bug_description")
			.setLabel("Bug description")
			.setStyle(TextInputStyle.Paragraph)
			.setMinLength(25)
			.setMaxLength(200)

		const bugIn = new TextInputComponent()
		.setCustomId('bug_in')
		.setLabel('Where bug has been found?')
		.setStyle(TextInputStyle.Short)

		const rows = [bugTitle, bugDescription, bugIn].map((component) => new ActionRow().addComponents(component));

		modal.addComponents(...rows);
		await interaction.showModal(modal);
	},
};
