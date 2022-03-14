const Discord = module.require("discord.js");

module.exports = {
    name: "say",
    description: "Make the bot say your message",
    botPerms: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'message',
            description: 'message',
            type: 3,
            required: true,
        },
    ],
      run: async (interaction, client, args) => {
    
        let message = interaction.options.getString('message');

        let embed = new Discord.MessageEmbed()
      .setTitle(`${message}`)
      .setFooter(`Sent by ${interaction.user.tag}`)
      .setColor("RANDOM");
    interaction.reply({ embeds: [embed] })
      }
    }
  
