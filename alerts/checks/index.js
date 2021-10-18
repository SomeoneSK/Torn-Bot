const global_data = require('../../global_data.js')
const general = require('../../general.js')

const stocks = require('./stocks.js')

async function starts_checks() {
	//setInterval(stocks, 1000*60)
	await stocks.stocks()
}

exports.starts_checks = starts_checks;