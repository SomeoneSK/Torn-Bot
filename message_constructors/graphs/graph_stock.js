import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageAttachment } from 'discord.js';
import {General_functions} from "../../helper_functions/general.js"
import {Components_functions} from '../../helper_functions/components.js'
import {Torn_data} from '../../torn/index.js'
import {Embed_functions} from '../../helper_functions/embeds.js'
import {Graphs_functions} from '../../helper_functions/graphs.js'

async function graph_stock(interaction, stock_acronym, property, interval) {
	if ( !Object.keys(Torn_data.stocks).includes(stock_acronym.toUpperCase()) ) {
		await interaction.reply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
		return false
	}
  
	let data = await General_functions.http_request( 'https://tornsy.com/api/' +  stock_acronym + '?interval=' + interval)

	let formatted_data = {}
	let index = 0
	for (let one of data["data"]) {
    let values = {}
		values.current_price = one[1]
    values.total_shares = one[2]
    if (interval !== 'm1') {
      values.total_shares = one[5]
      values.high = one[2]
      values.low = one[3]
      values. close = one[4]
    }
    values.market_cap = values.current_price * values.total_shares
		formatted_data[ one[0]*1000 ] = values[property]
	}
  const property_capitalized = property.charAt(0).toUpperCase() + property.slice(1);
  const title = property_capitalized.replace("_", " ") + " of " + stock_acronym.toUpperCase() + " with interval " + interval
	let graph = await Graphs_functions.timeline_graph(formatted_data, title, property.replace("_", " "))
  
  const attachment = new MessageAttachment(graph,'graph.png'); 
	const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle( title )
    .setTimestamp()
    .setFooter( "Page 1/1" )
    .setImage('attachment://graph.png')

	let to_reply = { embeds: [embed], components: [], files: [attachment] }
	return to_reply
}


export { graph_stock }