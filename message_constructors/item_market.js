import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {General_functions} from "../helper_functions/general.js"
import {Id_api_functions} from "../helper_functions/id_api.js"

import {Components_functions} from '../helper_functions/components.js'
import {item_bazaar as item_bazaar_constructor} from './item_bazaar.js'
import {item as item_constructor} from './item.js'
import {error as error_constructor} from './error.js'
import {Torn_data} from '../torn/index.js'
import {Embed_functions} from '../helper_functions/embeds.js'

async function item_market(interaction, item_id, info = false) {
	if (info === false) {
		const url = General_functions.make_url( "market", item_id, ["itemmarket"] )
		info = await Id_api_functions.get_data_from_api( url, interaction.user.id, false )
	}


	if ( info["error"] !== undefined ) {
		return await error_constructor(info["error"])
	}


	if (Object.keys(info).includes("itemmarket")) {
		info = info["itemmarket"]
	}

	let item = Torn_data.items[item_id]


	let fields = []
	if (info === null) {
		fields.push( { name: 'Item Market', value: "There are no listings for this item." } )
	} else {
		let field1 = ""
		for (let listing of info) {
			field1 += General_functions.format_number(listing["quantity"]) + "x $" + General_functions.format_number(listing["cost"]) + "\n"
		}
		fields.push( { name: 'Item Bazaar', value: field1, inline: true } )
	}

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(item["name"] + " [" + item_id + "]")
		.setDescription(item["description"])
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '')
		.setThumbnail(item["image"])
		.setURL( General_functions.make_link("item_market", item["name"]) )

	async function item_func() {
		let item_response = await item_constructor(interaction, item_id)
		await interaction.editReply( item_response )
	}
	async function market() {
		let market_response = await item_bazaar_constructor(interaction, item_id)
		await interaction.editReply( market_response )
	}

	let item_button = await Components_functions.button(interaction, "item", "Item", "PRIMARY", item_func)
	let market_button = await Components_functions.button(interaction, "bazaar", "Bazaar", "PRIMARY", market)

	const row = new MessageActionRow()
			.addComponents(item_button)
			.addComponents(market_button)

	let to_reply = await Embed_functions.check_reply({ embeds: [embed], components: [row] }, interaction, 3, 14)

	return to_reply
}


export { item_market }

/*
{
	"bazaar": [
		{
			"ID": 135945802,
			"cost": 450,
			"quantity": 1
		},
		{
			"ID": 135945801,
			"cost": 450,
			"quantity": 1
		},
		{
			"ID": 135925575,
			"cost": 499,
			"quantity": 1
		},
		{
			"ID": 135925577,
			"cost": 499,
			"quantity": 1
		}
	]
}
	*/