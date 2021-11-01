const config = require('../../config.json');

module.exports = (client, oldMember, newMember) => {
    if (oldMember.pending && !newMember.pending) {
        const role = newMember.guild.roles.cache.get(config.autoRoleId);
        if (!role) return;
        newMember.roles.add(role, `AutoRole`)
    }
}