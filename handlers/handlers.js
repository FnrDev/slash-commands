const { readdirSync } = require('fs');
module.exports = async(client) => {
    readdirSync("./commands/").map(async dir => {
        const commands = readdirSync(`./commands/${dir}/`).map(async cmd=> {
            let pull = require(`../commands/${dir}/${cmd}`)
            client.commands.set(pull.name, pull)
            if (pull.aliases) {
                pull.aliases.map(p => client.aliases.set(p, pull))
            }
        })
    })
}