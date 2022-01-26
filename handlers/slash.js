const { readdirSync } = require('fs');
module.exports = async (client) => {
	readdirSync('./slash/').map(async (dir) => {
		readdirSync(`./slash/${dir}/`).map(async (cmd) => {
			let pull = require(`../slash/${dir}/${cmd}`);
			client.slash.set(pull.name, pull);
		});
	});
};
