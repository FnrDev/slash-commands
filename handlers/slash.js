const { readdirSync } = require('fs');
module.exports = async(client) => {
    readdirSync("./slash/").map(async dir => {
        const commands = readdirSync(`./slash/${dir}/`).map(async cmd=> {
            let pull = require(`../slash/${dir}/${cmd}`)
            client.slash.set(pull.name, pull)
            if (pull.aliases) {
                pull.aliases.map(p => client.aliases.set(p, pull))
            }
        })
    })
}