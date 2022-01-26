// To make this event work you need to enable "MEMBER INTENTS"
module.exports = async(client, member) => {
    const channel = await member.guild.channels.cache.find(channel => channel.name === 'leave'); // Find channel named "leave" in guild
    if (!channel) return; // if there no channel named "leave" do nothing
    channel.send({ content: `👋 **${member} has been left ${member.guild.name}**\n\n**Members Counts:** #${member.guild.memberCount}` }); // Send message for left member
}