const global_data = require('../../global_data.js')
const general = require('../../general.js')

async function stocks() {
	let data = global_data.getData()

	let url = general.make_url( "torn", id="", selections=["stocks"] )
	info = await general.get_data_from_api_shared( url )

	console.log("Checking " + data["alerts"].length + " stock alerts.")
	for (let alert of data["alerts"]) {
		if (alert.alert.type === "stocks.reach") {
			await alert.check(info)
		}
	}
	
	setTimeout(stocks, 1000*10)
}

exports.stocks = stocks;

