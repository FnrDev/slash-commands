const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "role",
    description: "role someone.",
    permissions: "MANAGE_ROLES",
    options: [
        {
            name: "bots",
            description: "Gives a role to all bots in this server.",
            type: 1,
            options: [
                {
                    name: "type",
                    description: "pick a type",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "Give",
                            value: "give"
                        },
                        {
                            name: "Remove",
                            value: "remove"
                        }
                    ]
                },
                {
                    name: "role",
                    description: "Role to give all bots.",
                    type: 8,
                    required: true
                }
            ]
        },
        {
            name: "user",
            description: "Gives a user role.",
            type: 1,
            options: [
                {
                    name: "user",
                    description: "user to give a role.",
                    type: 6,
                    required: true
                },
                {
                    name: "role",
                    description: "Role to give a user.",
                    type: 8,
                    required: true
                }
            ],
        },
        {
            name: "all",
            description: "Role all members",
            type: 1,
            options: [
                {
                    name: "type",
                    description: "Pick a type",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "Give",
                            value: "give"
                        },
                        {
                            name: "Remove",
                            value: "remove"
                        }
                    ],
                },
                {
                    name: "role",
                    description: "role to give",
                    type: 8,
                    required: true
                },
            ]
        }
    ],
    timeout: 3000,
    run: async(interaction) => {
        const user = interaction.options.getMember('user'); // access to guild member obj <https://discord.js.org/#/docs/main/stable/class/GuildMember>
        const role = interaction.options.getRole('role'); // access to role obj <https://discord.js.org/#/docs/main/stable/class/Role>
        // User Sub Command
        if (interaction.options.getSubcommand() === 'user') {
            const botRole = interaction.guild.me.roles.highest.position;
            const roleToGet = user.roles.highest.position;
            const authorRole = interaction.member.roles.highest.position;
            if (authorRole <= roleToGet) {
                const embed = new MessageEmbed()
                .setTitle("I can't role this member because that member has role position is higher than my role or same as you!")
                .setColor('#ff0000')
                return interaction.reply({ embeds: [embed] })
            }
            if (botRole <= roleToGet) {
                const embed = new MessageEmbed()
                .setTitle("I can't role this member because that member has role position is higher than my role or same as you!")
                .setColor('#ff0000')
                return interaction.reply({ embeds: [embed] })
            }
            let addRoles;
            if (user._roles.includes(role.id)) {
                addRoles = '-'
                user.roles.remove(role, `By: ${interaction.user.tag}`)
                interaction.reply({ content: `✅ Changed role for ${user}, **${addRoles}${role.name}**` })
            } else {
                addRoles = '+'
                user.roles.add(role, `By: ${interaction.user.tag}`)
                interaction.reply({ content: `✅ Changed role for ${user}, **${addRoles}${role.name}**` })
            }
        }
        // Bots Sub Command
        if (interaction.options.getSubcommand() === 'bots') {
            if (interaction.options._hoistedOptions.find(r => r.value === 'give')) {
                interaction.guild.members.cache.filter(r => r.user.bot).forEach(bot => {
                    bot.roles.add(role, `By: ${interaction.user.tag}`)
                })
                const totalBots = interaction.guild.members.cache.filter(r => r.user.bot).size
                return interaction.reply({ content: `✅ Changed role for **${totalBots}** bots, **+${role.name}**` })
            }
            if (interaction.options._hoistedOptions.find(r => r.value == 'remove')) {
                interaction.guild.members.cache.filter(r => r.user.bot).forEach(bot => {
                    bot.roles.remove(role, `By: ${interaction.user.tag}`)
                })
                const totalBots = interaction.guild.members.cache.filter(r => r.user.bot).size
                return interaction.reply({ content: `✅ Changed role for **${totalBots}** bots, **-${role.name}**` })
            }
        }
        // role all sub command
        if (interaction.options.getSubcommand() === 'all') {
            if (interaction.options._hoistedOptions.find(r => r.value === 'give')) {
                interaction.guild.members.cache.forEach(member => {
                    member.roles.add(role, `By: ${interaction.user.tag}`)
                })
                const memberSize = interaction.guild.members.cache.size
                return interaction.reply({ content: `✅ Changed role for ${memberSize} members, **+${role.name}**` })
            }
            if (interaction.options._hoistedOptions.find(r => r.value === 'remove')) {
                interaction.guild.members.cache.forEach(member => {
                    member.roles.remove(role, `By: ${interaction.user.tag}`)
                })
                const memberSize = interaction.guild.members.cache.size
                return interaction.reply({ content: `✅ Changed role for **${memberSize}** members, **-${role.name}**` })
            }
        }
    }
}