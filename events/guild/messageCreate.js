const Timeout = new Set();
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const ms = require('ms')

module.exports = async (client , message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return; 
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                const embed = new MessageEmbed()
                .setTitle('You are in timeout!')
                .setDescription(`:x: You need to wait ${ms(command.timeout)} to use command again`)
                .setColor('#ff0000')
                return message.channel.send(embed)
            } else {       
                command.run(client, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(client,message,args)
        }
    }
}