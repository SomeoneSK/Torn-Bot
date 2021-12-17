import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageAttachment } from 'discord.js';
import {Components_functions} from '../../helper_functions/components.js'
import {Torn_data} from '../../torn/index.js'
import {Embed_functions} from '../../helper_functions/embeds.js'
import {Graphs_functions} from '../../helper_functions/graphs.js'

async function graph_stock(interaction, stock_acronym, property, interval) {
	if ( !Object.keys(Torn_data.stocks).includes(stock_acronym.toUpperCase()) ) {
		await interaction.reply( {content: "Wrong stock acronym - choose from: " + Object.keys(Torn_data.stocks).join(", ") } )
		return false
	}
  
  let graph = await Graphs_functions.stock(stock_acronym, property, interval)
  const property_capitalized = property.charAt(0).toUpperCase() + property.slice(1);
  const title = property_capitalized.replace("_", " ") + " of " + stock_acronym.toUpperCase() + " with interval " + interval
  
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
