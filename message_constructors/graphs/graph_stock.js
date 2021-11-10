const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {General_functions} = require("../../helper_functions/general.js")
const {Components_functions} = require('../../helper_functions/components.js')
const {Message_constructors} = require('../../message_constructors')
const {Torn_data} = require('../../torn')
const {Embed_functions} = require('../../helper_functions/embeds.js')
const {Charts_functions} = require('../../helper_functions/charts.js')

async function graph_stock(interaction, stock_acronym, property, interval) {
	if ( !Object.keys(Torn_data.stocks).includes(stock_acronym.toUpperCase()) ) {
		await interaction.reply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
		return false
	}

	/*let data = await General_functions.http_request( 'https://tornsy.com/api/' +  stock_acronym + '?interval=m1')

	let formatted_data = {}
	let index = 0
	for (let one of data["data"]) {
		if (index > 20) {continue}
		let value = one[1]
		formatted_data[ one[0] ] = value
		index += 1
	}
	console.log(formatted_data)
*/
	let formatted_data = {
	'1636320240': '881.62',
	'1636320300': '881.67',
	'1636320360': '881.73',
	'1636320420': '881.83',
	'1636320480': '881.83',
	'1636320540': '881.78',
	'1636320600': '882.14',
	'1636320660': '882.09',
	'1636320720': '881.88',
	'1636320780': '881.83',
	'1636320840': '882.14',
	'1636320900': '882.19',
	'1636320960': '882.35',
	'1636321020': '882.35',
	'1636321080': '882.20',
	'1636321140': '882.25',
	'1636321200': '882.14',
	'1636321260': '882.14',
	'1636321320': '881.84',
	'1636321380': '881.63',
	'1636321440': '881.68'
	}
	let graph = await Charts_functions.timeline_graph(data=formatted_data, title = "Title", y_label = property.replace("_", ""))

	const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle( "name" )
	.addFields([])
	.setTimestamp()
	.setFooter( "Page 1/1" )

	//let to_reply = await Embed_functions.check_reply({ content: "test", embeds: [], components: [], files: [graph] }, interaction)
	let to_reply = { content: "test", embeds: [], components: [], files: [graph] }
	return to_reply
}


exports.graph_stock = graph_stock;


