const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {General_functions} = require("../helper_functions/general.js")
const {Id_api_functions} = require("../helper_functions/id_api.js")
const {Components_functions} = require('../helper_functions/components.js')
const {Message_constructors} = require('../message_constructors')
const {Torn_data} = require('../torn')
const {Embed_functions} = require('../helper_functions/embeds.js')

async function stock(interaction, stock_acronym = null, info=false) {
	if (info === false) {
		url = General_functions.make_url( "torn", id="", selections=["stocks"] )
		info = await Id_api_functions.get_data_from_api( url, user_id=interaction.user.id, private=false )
	}

	if ( info["error"] !== undefined ) {
		return await Message_constructors.error(info["error"])
	}

	if (Object.keys(info).includes("stocks")) {
		info = info["stocks"]
	}

	if (stock_acronym === null) {stock_acronym = "TSB"}

	if ( !Object.keys(Torn_data.stocks).includes(stock_acronym.toUpperCase()) ) {
		await interaction.reply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
		return false
	}

	let stock_index = Torn_data.stocks[ stock_acronym.toUpperCase() ]["index"]
	
	let pages = []
	let index = 0
	for (let stock of Object.keys(info)) {
		index += 1
		let stock_info = info[stock]
		let field1 = ''
		field1 += "**Current price**: $" + General_functions.format_number(stock_info["current_price"]) + "\n**Market cap**: $" + General_functions.format_number(stock_info["market_cap"]) + "\n**Total shares**: $" + General_functions.format_number(stock_info["total_shares"])

		let fields = [ { name: "Values" , value: field1, inline: true } ]

		let field2 = "Type: " + stock_info.benefit.type
		if (stock_info.benefit.type === "active") {
			field2 += " - every **" + stock_info.benefit.frequency + "** days"
		}
		field2 += "\nReq: " + General_functions.format_number(stock_info.benefit.requirement) + " - **$" + General_functions.format_number(stock_info.benefit.requirement * stock_info["current_price"]) + "**"
		field2 += "\n**" + stock_info.benefit.description + "**"

		fields.push( { name: "Benefit" , value: field2, inline: true } )

		const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle( stock_info["name"] + " - " + stock_info["acronym"] )
		.addFields(fields)
		.setTimestamp()
		.setFooter( "Page " + index + "/" + Object.keys(info).length )

		pages.push( { embeds: [embed], components: [] } )
	}

	let to_reply = await Embed_functions.pagination( pages, interaction, default_page = stock_index )


	//let to_reply = await Embed_functions.check_reply({ embeds: [embed], components: [] }, interaction)

	return to_reply
}


exports.stock = stock;

/*
{
	"stocks": {
		"1": {
			"stock_id": 1,
			"name": "Torn & Shanghai Banking",
			"acronym": "TSB",
			"current_price": 867.81,
			"market_cap": 10628536379610,
			"total_shares": 12247538493,
			"benefit": {
				"type": "active",
				"frequency": 31,
				"requirement": 3000000,
				"description": "$50,000,000"
			}
		},
		"2": {
			"stock_id": 2,
			"name": "Torn City Investments",
			"acronym": "TCB",
			"current_price": 894.7,
			"market_cap": 11706683555450,
			"total_shares": 13084479217,
			"benefit": {
				"type": "passive",
				"frequency": 7,
				"requirement": 1500000,
				"description": "a 10% Bank Interest Bonus"
			}
		},
		"3": {
			"stock_id": 3,
			"name": "Syscore MFG",
			"acronym": "SYS",
			"current_price": 465.4,
			"market_cap": 3026978162655,
			"total_shares": 6504035588,
			"benefit": {
				"type": "passive",
				"frequency": 7,
				"requirement": 3000000,
				"description": "an Advanced Firewall"
			}
		},
		"4": {
			"stock_id": 4,
			"name": "Legal Authorities Group",
			"acronym": "LAG",
			"current_price": 301.63,
			"market_cap": 1940066478148,
			"total_shares": 6431941379,
			"benefit": {
				"type": "active",
				"frequency": 7,
				"requirement": 750000,
				"description": "1x Lawyer Business Card"
			}
		},
*/

