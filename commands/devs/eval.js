const OwnerID = ['596227913209217024']

module.exports = {
    name: "eval",
    description: "eval",
    run: async(client, message, args) => {
        if (!OwnerID.includes(message.author.id)) return;
        let codein = args.join(" ")
        try {
            let code = eval(codein)
            if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0})
            message.channel.send(`\`\`\`js\n${code}\n\`\`\``)
        } catch(e) {
            return message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
        }
    }
}