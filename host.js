import express from 'express';
const app = express();
const port = 3000;

function host() {
	app.get('/', (req, res) => res.send('Hello World!'));
	app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}

export default host

/*
data = Database.getData()
		//let operation1 = {"updateOne": { filter: filter, update: update } }
		let operations = [  ]

		let stocks = {
		"1": {
			"stock_id": 1,
			"name": "Torn & Shanghai Banking",
			"acronym": "TSB",
			"current_price": 883.93,
			"market_cap": 10468436638364,
			"total_shares": 11843060693,
			"benefit": {
				"type": "active",
				"frequency": 31,
				"requirement": 3000000,
				"description": "$50,000,000"
			}
		}}
		for (let stock of Object.keys(stocks)) {
			let this_stock = stocks[stock]
			let now = + new Date()
			this_stock[ "history" ] = { "current_price":{}, "market_cap":{}, "total_shares":{} }
			this_stock[ "history" ][ "current_price" ][now] = this_stock["current_price"]
			this_stock[ "history" ][ "market_cap" ][now] = this_stock["market_cap"]
			this_stock[ "history" ][ "total_shares" ][now] = this_stock["total_shares"]

			operations.push( {"insertOne": this_stock } )
		}
		a = await Database.setData( data, {"stocks": operations } )
		*/