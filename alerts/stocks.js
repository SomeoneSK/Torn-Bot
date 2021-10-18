const alerts_general = require('./general.js')
const factories = require('./factories')


async function new_stock_alert_reach(interaction) {
	let stock = interaction.options.get("stock").value
	let higher_or_lower = interaction.options.get("higher-or-lower").value
	let value = interaction.options.get("value").value
	let property = interaction.options.get("property").value
	
	let alerts = await factories.stock_reach(stock, higher_or_lower, property, value, {type: "user", id: interaction.user.id}, {type: "user", id: interaction.user.id}, interaction.channelId)

	await alerts_general.add_alert( alerts )

	await interaction.reply( {content: "Will ping you, when " + stock + "'s " + property.replace("_", " ") + " will be " + higher_or_lower + " than " + value + "!" } )
}	


exports.new_stock_alert_reach = new_stock_alert_reach;