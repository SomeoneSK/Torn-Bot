import {Database} from "../../database.js"

import {General_functions} from "../../helper_functions/general.js"
import {Id_api_functions} from "../../helper_functions/id_api.js"

async function stocks() {
	let data = Database.getData()

	const url = General_functions.make_url( "torn", "", ["stocks"] )
	const info = await Id_api_functions.get_data_from_api_shared( url )

	if ( info["error"] !== undefined ) {
		console.log("Could not check stocks! - " + info["error"])
		setTimeout(stocks, 1000*60*5)
		return
	}

	console.log("Checking " + data["alerts"].length + " stock alerts.")
	for (let alert of data["alerts"]) {
		if (alert.alert.type === "stocks.reach") {
			await alert.check(info)
		}
	}
	
	setTimeout(stocks, 1000*60)
}

const Stocks_alerts_checks = {
	stocks: stocks,
}

export { Stocks_alerts_checks }
