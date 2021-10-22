const {Database} = require("../../database.js")

const {Stocks_alerts_checks} = require('./stocks.js')

async function start_checks() {
	//setInterval(stocks, 1000*60)
	await Stocks_alerts_checks.stocks()
}

const Alerts_checks = {
	start_checks: start_checks,
}

exports.Alerts_checks = Alerts_checks;