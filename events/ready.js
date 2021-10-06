const global_data = require('../global_data.js')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await global_data.make_data()
	},
};