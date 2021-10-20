const {Database} = require("../database.js")
const general = require('../general.js')

async function get_alert_by_code(code) {
	let data = Database.getData()
	for (let alert in data["alerts"]) {
		if (alert["code"] === code) {
			return alert
		}
	}
	return undefined
}

async function new_code() {
	while (true) {
		let code = general.make_random_str(10)
		let alert = await get_alert_by_code(code)
		if (alert === undefined) {
			return code
		}
	}
}

async function add_alert(alerts) {
	let alert = alerts["alert"]
	let alert_for_db = alerts["alert_for_db"]
	
	let data = Database.getData()

	let operation1 = {"insertOne": alert_for_db }

	data = Database.getData()
	data["alerts"].push( alert )
	a = await Database.setData( data, {"alerts": [ operation1 ] } )
}

async function delete_alert(code) {
	let filter = {code: code }
	let operation1 = {"deleteOne": {filter: filter} }
	data = Database.getData()
	
	data["alerts"] = general.delete_from_list_by_key(data["alerts"], "code", code)
	a = await Database.setData( data, {"alerts": [ operation1 ] } )
}

exports.add_alert = add_alert;
exports.delete_alert = delete_alert;
exports.new_code = new_code;