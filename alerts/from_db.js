const factories = require('./factories')

async function from_db(alert) {
	if (alert.alert.type === "stocks.reach") {
		let alerts = await factories.stock_reach(alert.alert.stock, alert.alert.higher_or_lower, alert.alert.property, alert.alert.value, alert.owner, alert.to_ping, alert.channel, code=alert.code)
		return alerts.alert
	}
	return alert
}

exports.from_db = from_db;