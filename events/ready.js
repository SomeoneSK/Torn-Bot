const {Database} = require("../database.js")
const {General_functions} = require("../helper_functions/general.js")

const {Alerts_checks} = require('../alerts/checks')
const { status_channel } = require('../config.json');

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
		await General_functions.set_emojis(emojis)

		General_functions.makeClient(client)
		
		
		await Alerts_checks.start_checks()

		let chan = await General_functions.get_channel(status_channel)
		async function send_msg() {
			let now = new Date()
			chan.send( now.toString() )
		}
		if (chan !== undefined) {
			setInterval(send_msg, 1000*60*15)
		}
	},
};

