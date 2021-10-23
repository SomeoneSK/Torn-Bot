const {Database} = require("../../database.js")

const {General_functions} = require("../../helper_functions/general.js")

async function stocks() {
	let data = Database.getData()

	let url = General_functions.make_url( "torn", id="", selections=["stocks"] )
	info = await General_functions.get_data_from_api_shared( url )

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

exports.stocks = stocks;

const Stocks_alerts_checks = {
	stocks: stocks,
}

exports.Stocks_alerts_checks = Stocks_alerts_checks;
