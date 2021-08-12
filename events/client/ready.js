module.exports = async client => {   
      client.user.setActivity('Github: FnrDev', {type: 'LISTENING'})
      console.log(`Logged in as ${client.user.tag}`);
};