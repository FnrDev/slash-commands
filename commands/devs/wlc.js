module.exports = {
    name: "wlc",
    description: "emit welcome",
    devs: true,
    run: async(client, message) => {
        client.emit('guildMemberAdd', message.member);
        message.channel.send('Done ...')
    }
}