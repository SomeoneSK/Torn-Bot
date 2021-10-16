const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')
const error = require('./error.js')

const components = require('../helper_functions/components.js')
const responses = require('../responses')
const torn = require('../torn')
const embeds = require('../helper_functions/embeds.js')

async function item_bazaar(interaction, item_id, info = false) {
	if (info === false) {
		url = general.make_url( "market", id=item_id, selections=["bazaar"] )
		info = await general.get_data_from_api( url, user_id=interaction.user.id, private=false )
	}


	if ( info["error"] !== undefined ) {
		return await error.error(info["error"])
	}

	let fields = []

	if (Object.keys(info).includes("bazaar")) {
		info = info["bazaar"]
	}

	let item = torn.items[item_id]


	let field1 = ''
	let index = 0
	for (let listing of info) {
		if (index % 5 === 0 && index !== 0) {
			fields.push( { name: 'Item Bazaar', value: field1, inline: true } )
			field1 = ""
		}
		index += 1
		field1 += general.format_number(listing["quantity"]) + "x $" + general.format_number(listing["cost"]) + "\n"
	}
	fields.push( { name: 'Item Bazaar', value: field1, inline: true } )

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(item["name"] + " [" + item_id + "]")
		.setDescription(item["description"])
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '')
		.setThumbnail(item["image"])
		.setURL( general.make_link("item_market", item["name"]) )

	async function item_func() {
		let item_response = await responses.item(interaction, item_id)
		await interaction.editReply( item_response )
	}
	async function market() {
		let market_response = await responses.item_market(interaction, item_id)
		await interaction.editReply( market_response )
	}

	let item_button = await components.button(interaction = interaction, button_id = "item", button_label = "Item", button_style="PRIMARY", func = item_func)
	let market_button = await components.button(interaction = interaction, button_id = "market", button_label = "Market", button_style="PRIMARY", func = market)

	const row = new MessageActionRow()
			.addComponents(item_button)
			.addComponents(market_button)

	let to_reply = await embeds.check_reply({ embeds: [embed], components: [row] }, interaction, fields = 6)

	return to_reply
}

exports.item_bazaar = item_bazaar;

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