import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageAttachment } from 'discord.js';
import {General_functions} from "../helper_functions/general.js"
import {Id_api_functions} from "../helper_functions/id_api.js"
import {Components_functions} from '../helper_functions/components.js'
import {error as error_constructor} from './error.js'
import {Torn_data} from '../torn/index.js'
import {Embed_functions} from '../helper_functions/embeds.js'
import {Graphs_functions} from '../helper_functions/graphs.js'

async function stock(interaction, stock_acronym = null, info=false) {
	if (info === false) {
		const url = General_functions.make_url( "torn", "", ["stocks"] )
		info = await Id_api_functions.get_data_from_api( url, interaction.user.id, false )
	}

	if ( info["error"] !== undefined ) {
		return await error_constructor(info["error"])
	}

	if (Object.keys(info).includes("stocks")) {
		info = info["stocks"]
	}

	if (stock_acronym === null) {stock_acronym = "TSB"}

	if ( !Object.keys(Torn_data.stocks).includes(stock_acronym.toUpperCase()) ) {
		await interaction.editReply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
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

    async function reply(interation, add_the_buttons){
		const title = "Current price".replace("_", " ") + " of " + stock_info["acronym"] + " with interval m1"
		let new_msg = { embeds: [embed], components: [], attachments: [], files: [] }
		new_msg = await add_the_buttons(new_msg)
			await interaction.editReply( new_msg )

		let attachment
		let graph = await Graphs_functions.stock(stock_info["acronym"], "current_price", "m1")
		attachment = new MessageAttachment(graph,'graph.png');
		embed.setImage('attachment://graph.png')
		new_msg = { embeds: [embed], components: [], attachments: [], files: [attachment] }
		new_msg = await add_the_buttons(new_msg)
		await interaction.editReply( new_msg )
    }
    
    pages.push( reply )
	}
  
	let to_reply = await Embed_functions.pagination( pages, interaction, stock_index )

	return to_reply
}


export { stock }

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

