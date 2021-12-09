import {Alerts_factories} from './factories/index.js'

async function db_alert_to_alert(alert) {
	if (alert.alert.type === "stocks.reach") {
		let alerts = await Alerts_factories.stock_reach(alert.alert.stock, alert.alert.higher_or_lower, alert.alert.property, alert.alert.value, alert.owner, alert.to_ping, alert.channel, alert.code)
		return alerts.alert
	}
	return alert
}

export { db_alert_to_alert }