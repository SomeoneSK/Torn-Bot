const {Database} = require("../../database.js")

const {Stocks_alerts_checks} = require('./stocks.js')
const {General_functions} = require("../../helper_functions/general.js")

async function start_checks() {
	if (General_functions.am_i_original() ) {
		await Stocks_alerts_checks.stocks()
	}
}

const Alerts_checks = {
	start_checks: start_checks,
}

exports.Alerts_checks = Alerts_checks;