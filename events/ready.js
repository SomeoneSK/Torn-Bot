const global_data = require('../global_data.js')
const general = require('../general.js')

const checks = require('../alerts/checks')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await global_data.make_data()

		let guild = client.guilds.cache.get('892037665719984128')
		let names = ["offline", "online", "idle", "in_hospital", "traveling", "in_jail"]
		let emojis = {}
		for (let i of names) {
			emojis[i] = guild.emojis.cache.find(emoji => emoji.name === i).toString();
		}
		await general.set_emojis(emojis)

		general.makeClient(client)

		await checks.starts_checks()
	},
};

