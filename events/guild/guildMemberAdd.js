// To make this event work you need to enable "MEMBER INTENTS"
module.exports = async(client, member) => {
    const channel = await member.guild.channels.cache.find(channel => channel.name === 'welcome'); // Find channel named "welcome" in guild
    if (!channel) return; // if there no channel named "welcome" do nothing
    channel.send({ content: `👋 **Welcome ${member} to ${member.guild.name}**\n\n**Members Counts:** #${member.guild.memberCount}` }); // Send message for new member
    const role = member.guild.roles.cache.find(r => r.name === 'member');
    if (!role) return;
    if (!member.pending) {
        member.roles.add(role, `Auto Role`)
    }
    setInterval(() => {
        if (!member.pending) {
            member.roles.add(role, `Auto Role`)
        }
    }, 2000)
}