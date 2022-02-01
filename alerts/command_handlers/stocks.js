import {Alerts_general} from '.././general.js'
import {Alerts_factories} from '.././factories/index.js'
import {Torn_data} from '../../torn/index.js'
import {General_functions} from "../../helper_functions/general.js"

async function stock_reach(interaction) {
	let stock = interaction.options.get("stock").value.toUpperCase()
	if ( !Object.keys(Torn_data.stocks).includes(stock) ) {
		await interaction.reply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
		return false
	}
	let higher_or_lower = interaction.options.get("higher-or-lower").value
	let value = interaction.options.get("value").value
	let property = interaction.options.get("property")
    if (property) { 
        property = property.value
    } else {
        property = "current_price"
    }
	
	let alerts = await Alerts_factories.stock_reach(stock, higher_or_lower, property, value, {type: "user", id: interaction.user.id}, {type: "user", id: interaction.user.id}, interaction.channelId)

	await Alerts_general.add_alert( alerts )

	await interaction.reply( {content: "Will ping you, when " + stock + "'s " + property.replace("_", " ") + " will be " + higher_or_lower + " than " + General_functions.format_number(value) + "!" } )
}	

const Stocks_alerts_handlers = {
	stock_reach: stock_reach,
}

export { Stocks_alerts_handlers}