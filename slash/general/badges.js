module.exports = {
  name: "badges",
  description: "Get list of members with badges",
  options: [
    {
      name: "badge",
      description: "Badge you want to get list of members for",
      type: 3,
      required: true,
      choices: [
        {
          name: "Discord Staff",
          value: "STAFF",
        },
        {
          name: "Discord Partnerd",
          value: "PARTNER",
        },
        {
          name: "Hypesquad Events",
          value: "HYPESQUAD",
        },
        {
          name: "Bug Hunter Level 1",
          value: "BUG_HUNTER_LEVEL_1",
        },
        {
          name: "House Bravery",
          value: "HYPESQUAD_ONLINE_HOUSE_1",
        },
        {
          name: "House Brilliance",
          value: "HYPESQUAD_ONLINE_HOUSE_2"
        },
        {
          name: "House Balance",
          value: "HYPESQUAD_ONLINE_HOUSE_3"
        },
        {
          name: "Early Supporter",
          value: "PREMIUM_EARLY_SUPPORTER",
        },
        {
          name: "Bug Hunter Level 2",
          value: "BUG_HUNTER_LEVEL_2",
        },
        {
          name: "Verified Bot",
          value: "VERIFIED_BOT",
        },
        {
          name: "Verified Bot Developer",
          value: "VERIFIED_DEVELOPER",
        },
        {
          name: "Certified Moderator",
          value: "CERTIFIED_MODERATOR",
        },
      ],
    },
    {
      name: "role",
      description: "Get list of all members with this badge",
      type: 8,
    },
  ],
  category: "general",
  run: async (interaction) => {
    const badges = interaction.options.getString("badge");
    const role = interaction.options.getRole("role");
    const getMembersWithRole = role?.members.filter(r => r.user.flags?.has(badges));
    const allMembersWithBadge = (await interaction.guild.members.fetch()).filter(
      (r) => r.user.flags?.has(badges)
    )
    if (!allMembersWithBadge.size) {
      return interaction.reply({
        content: `:x: No one has \`${badges}\` badge.`,
        ephemeral: true
      })
    }
    if (role) {
      const getMembersWithBadges = getMembersWithRole.map(r => r.user).join("\n");
      return interaction.reply({
        content: `Total members with role **${role.name}** has \`${badges.toLowerCase()}\` is **${getMembersWithRole.size}**\n\n${getMembersWithBadges}`
      })
    }
    const filterMembers = allMembersWithBadge.map(r => r.user).join("\n");
    interaction.reply({
      content: `There are **${allMembersWithBadge.size}** members with ${badges.toLowerCase()} badge.\n\n${filterMembers}`
    })
  },
};
