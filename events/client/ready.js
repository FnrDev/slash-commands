require('colors')

module.exports = async client => {   
      client.user.setActivity('Github: FnrDev', { type: 'LISTENING' });
      console.log(`[Discord API] Logged in as ${client.user.tag}`.magenta);
};