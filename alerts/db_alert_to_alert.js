const {Alerts_factories} = require('./factories')

async function db_alert_to_alert(alert) {
	if (alert.alert.type === "stocks.reach") {
		let alerts = await Alerts_factories.stock_reach(alert.alert.stock, alert.alert.higher_or_lower, alert.alert.property, alert.alert.value, alert.owner, alert.to_ping, alert.channel, code=alert.code)
		return alerts.alert
	}
	return alert
}

exports.db_alert_to_alert = db_alert_to_alert;