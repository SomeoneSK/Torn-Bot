const {Stocks_alerts_handlers} = require('./stocks.js')

async function command_handler(interaction) {
	if ( interaction.options._group === "stocks" ) {
		if ( interaction.options._subcommand === "reach" ) {
			await Stocks_alerts_handlers.stock_reach(interaction)
		}
	}
}

const Alerts_command_handler = {
	command_handler: command_handler,
}

exports.Alerts_command_handler = Alerts_command_handler;
