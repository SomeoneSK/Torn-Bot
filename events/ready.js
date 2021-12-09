import {Database} from "../database.js"
import {General_functions} from "../helper_functions/general.js"

import {Alerts_checks} from '../alerts/checks/index.js'
import { db_alert_to_alert } from '../alerts/db_alert_to_alert.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

let config = false
try {
	config = require('./config.json')
} catch(error) {
	config = {
		"clientId": "895302817672204368",
		"guildId": "892037665719984128",
		"error_channel": "899743106482704434",
		"status_channel": "899732115384594442",
		"commands_channel": "899734106290671636",
		"token": process.env.token,
		"db_string": process.env.db_string
	}
}

let name = 'ready'
let once = true
async function execute(client) {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	let data = await Database.makeData()

	let guild = client.guilds.cache.get('892037665719984128')
	let names = ["offline", "online", "idle", "in_hospital", "traveling", "in_jail"]
	let emojis = {}
	for (let i of names) {
		emojis[i] = guild.emojis.cache.find(emoji => emoji.name === i).toString();
	}
	await General_functions.set_emojis(emojis)

	General_functions.makeClient(client)
	
	await data["alerts_raw"].forEach( async function(i) {
		let alert = await db_alert_to_alert( i )
		data["alerts"].push( alert )
	} )
	await Alerts_checks.start_checks()

	let chan = await General_functions.get_channel(config.status_channel)
	async function send_msg() {
		let now = new Date()
		chan.send( now.toString() )
	}
	if (chan !== undefined) {
		setInterval(send_msg, 1000*60*15)
	}

	client.user.setPresence({ activities: [{ name: 'https://discord.gg/3RmCckhXWg' }], status: 'online' });
  
}

export { name }
export { execute }