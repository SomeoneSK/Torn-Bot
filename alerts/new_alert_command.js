const stocks = require('./stocks.js')

async function new_alert_command(interaction) {
	if ( interaction.options._group === "stocks" ) {
		if ( interaction.options._subcommand === "reach" ) {
			await stocks.new_stock_alert_reach(interaction)
		}
	}
}

exports.new_alert_command = new_alert_command;

