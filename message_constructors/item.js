import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {General_functions} from "../helper_functions/general.js"
import {Id_api_functions} from "../helper_functions/id_api.js"

import {Components_functions} from '../helper_functions/components.js'
import {error as error_constructor} from './error.js'
import {item_market as item_market_constructor} from './item_market.js'
import {item_bazaar as item_bazaar_constructor} from './item_bazaar.js'

async function item(interaction, item_id, info = false) {
	if (info === false) {
		const url = General_functions.make_url( "torn", "", ["items"] )
		info = await Id_api_functions.get_data_from_api( url, interaction.user.id, false )
	}


	if ( info["error"] !== undefined ) {
		return await error_constructor(info["error"])
	}

	let fields = []

	if (Object.keys(info).includes("items")) {
		info = info["items"]
	}
	let item = info[item_id]

	if (item === undefined) {
		return await error_constructor("Item with such ID does not exist!")
	}
	let field1 = '\n**Effect: **' + item["effect"]
	field1 += '\n**Requirement: **' + item["requirement"]
	field1 += '\n**Type: **' + item["type"]
	if (item["weapon_type"] !== null) {
		field1 += '\n**Weapon Type: **' + item["weapon_type"]
	}
	field1 += '\n**Buy, Sell Price: **' + General_functions.format_number(item["buy_price"]) + ", " + General_functions.format_number(item["sell_price"])
	field1 += '\n**Market Value: **$' + General_functions.format_number(item["market_value"])
	field1 += '\n**Circulation: **' + General_functions.format_number(item["circulation"])
	fields.push( { name: 'Info', value: field1, inline: true } )

	if (item["coverage"] !== undefined) {
		let field2 = ''
		for (let key of Object.keys(item["coverage"])) {
			field2 += "**" + key + "** - " + item["coverage"][key] + "\n"
		}
		fields.push( { name: 'Coverage', value: field2, inline: true } )
	}

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(item["name"] + " [" + item_id + "]")
		.setDescription(item["description"])
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '')
		.setThumbnail(item["image"])

	async function market() {
		let market_response = await item_market_constructor(interaction, item_id)
		await interaction.editReply( market_response )
	}
	async function bazaar() {
		let bazaar_response = await item_bazaar_constructor(interaction, item_id)
		await interaction.editReply( bazaar_response )
	}

	let market_button = await Components_functions.button(interaction = interaction, "market", "Market", "PRIMARY", market)
	let bazaar_button = await Components_functions.button(interaction = interaction, "bazaar", "Bazaar", "PRIMARY", bazaar)

	const row = new MessageActionRow()
			.addComponents(market_button)
			.addComponents(bazaar_button)

	return { embeds: [embed], components: [row] }
}


export { item }
/*
"681": {
		"name": "EOD Apron",
		"description": "When the bomb goes off, its impact goes everywhere. This apron shields your vital organs from blast compression and debris damage.",
		"effect": "",
		"requirement": "",
		"type": "Defensive",
		"weapon_type": null,
		"buy_price": 0,
		"sell_price": 0,
		"market_value": 0,
		"circulation": 0,
		"image": "https://www.torn.com/images/items/681/large.png",
		"coverage": {
			"Full Body Coverage": 55.24,
			"Throat Coverage": 100,
			"Arm Coverage": 100,
			"Groin Coverage": 100,
			"Stomach Coverage": 100,
			"Heart Coverage": 100,
			"Chest Coverage": 100,
			"Leg Coverage": 17.58,
			"Hand Coverage": 16.88,
			"Head Coverage": 4.68,
			"Foot Coverage": 0
		}
	},
	*/