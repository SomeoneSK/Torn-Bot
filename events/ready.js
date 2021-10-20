const {Database} = require("../database.js")
const general = require('../general.js')

const checks = require('../alerts/checks')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await Database.makeData()

		let guild = client.guilds.cache.get('892037665719984128')
		let names = ["offline", "online", "idle", "in_hospital", "traveling", "in_jail"]
		let emojis = {}
		for (let i of names) {
			emojis[i] = guild.emojis.cache.find(emoji => emoji.name === i).toString();
		}
		await general.set_emojis(emojis)

		general.makeClient(client)

		await checks.starts_checks()

		async function send_msg() {
			let chan = await general.get_channel("899732115384594442")
			let now = new Date()
			chan.send( now.toString() )
		}
		setInterval(send_msg, 1000*60*15)
	},
};

