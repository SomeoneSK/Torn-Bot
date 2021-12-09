import {Database} from "../../database.js"

import {Stocks_alerts_checks} from './stocks.js'
import {General_functions} from "../../helper_functions/general.js"

async function start_checks() {
	if (General_functions.am_i_original() ) {
		await Stocks_alerts_checks.stocks()
	}
}

const Alerts_checks = {
	start_checks: start_checks,
}

export { Alerts_checks }