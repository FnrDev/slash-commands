const { readdirSync } = require('fs')
const path = require('path')
const config = require('../../config.json')
require('colors')
module.exports = async client => {   
      client.user.setActivity('Github: FnrDev', {type: 'LISTENING'})
      console.log(`Logged in as ${client.user.tag}`);
      readdirSync("./commands/").map(async dir => {
            if (dir !== 'devs') {
                  const commands = readdirSync(`./commands/${dir}/`).map(async (cmd, i) => {
                        let command = require(path.join(__dirname, `../../commands/${dir}/${cmd}`))
                        const x = await client.guilds.cache.get(config.serverID)?.commands.create(command);
                        console.log(`Loaded ${x.name}: slash command id (${x.permissions.commandId})`.green)
                    })
            }
      })
};