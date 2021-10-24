const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {General_functions} = require("../helper_functions/general.js")


const {Components_functions} = require('../helper_functions/components.js')
const {Message_constructors} = require('../message_constructors')
const {Torn_data} = require('../torn')
const {Embed_functions} = require('../helper_functions/embeds.js')

async function item_market(interaction, item_id, info = false) {
	if (info === false) {
		url = General_functions.make_url( "market", id=item_id, selections=["itemmarket"] )
		info = await General_functions.get_data_from_api( url, user_id=interaction.user.id, private=false )
	}


	if ( info["error"] !== undefined ) {
		return await Message_constructors.error(info["error"])
	}


	if (Object.keys(info).includes("itemmarket")) {
		info = info["itemmarket"]
	}

	let item = Torn_data.items[item_id]

	let fields = []
	if (info === null) {
		fields.push( { name: 'Item Bazaar', value: "There are no listings for this item." } )
	} else {
		let field1 = ""
		for (let listing of info) {
			field1 += General_functions.format_number(listing["quantity"]) + "x $" + General_functions.format_number(listing["cost"]) + "\n"
		}
		fields.push( { name: 'Item Market', value: field1, inline: true } )
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
		let market_response = await Message_constructors.item(interaction, item_id)
		await interaction.editReply( market_response )
	}
	async function bazaar() {
		let bazaar_response = await Message_constructors.item_bazaar(interaction, item_id)
		await interaction.editReply( bazaar_response )
	}

	let market_button = await Components_functions.button(interaction = interaction, button_id = "item", button_label = "Item", button_style="PRIMARY", func = item_func)
	let bazaar_button = await Components_functions.button(interaction = interaction, button_id = "bazaar", button_label = "Bazaar", button_style="PRIMARY", func = bazaar)

	const row = new MessageActionRow()
			.addComponents(market_button)
			.addComponents(bazaar_button)

	let to_reply = await Embed_functions.check_reply({ embeds: [embed], components: [row] }, interaction, fields_limit = 3, new_lines_limit=14)

	return to_reply
}


exports.item_market = item_market;

/*
{
	"itemmarket": [
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