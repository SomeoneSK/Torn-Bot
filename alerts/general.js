const {Database} = require("../database.js")
const {General_functions} = require("../helper_functions/general.js")

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
		let code = General_functions.make_random_str(10)
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
	
	data["alerts"] = General_functions.delete_from_list_by_key(data["alerts"], "code", code)
	a = await Database.setData( data, {"alerts": [ operation1 ] } )
}

async function get_users_alerts(id) {
	let data = Database.getData()
	let alerts = []
	for (let alert of data["alerts"]) {
		if (alert["owner"]["type"] === "user" && alert["owner"]["id"] === id) {
			alerts.push(alert)
		}
	}
	return alerts
}

const Alerts_general = {
	add_alert: add_alert,
	delete_alert: delete_alert,
	new_code: new_code,
	get_users_alerts: get_users_alerts,
}

exports.Alerts_general = Alerts_general;