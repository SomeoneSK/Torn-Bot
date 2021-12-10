import { SlashCommandBuilder } from '@discordjs/builders'; //  !!!
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('graph-stock')
		.setDescription("Graphs stock property's history during chosen time interval")
		.addStringOption((option) =>
			option.setName('stock_acronym').setDescription('The stock - use stock acronym').setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName('property')
				.setDescription('The property of which history you wanna graph.')
				.addChoices([
					['Price', 'current_price'],
					['Market Cap', 'market_cap'],
					['Total Shares', 'total_shares']
				])
				.setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName('interval')
				.setDescription('time interval')
        .addChoices([
					['Every 1 minute', 'm1'],
					['Every 5 minutes', 'm5'],
					['Every 15 minutes', 'm15'],
          ['Every 30 minutes', 'm30'],
					['Every 1 hour', 'h1'],
					['Every 2 hours', 'h2'],
          ['Every 4 hours', 'h4'],
					['Every 6 hours', 'h6'],
					['Every 12 hours', 'h12'],
          ['Every 1 day', 'd1'],
					['Every 1 week', 'w1'],
					['Every 1 month', 'n1'],
          ['All', 'all'],
				])
				.setRequired(false),
		)

async function execute(interaction) {
	let stock_acronym = interaction.options.getString('stock_acronym');
	let property = interaction.options.getString('property');
	let interval = interaction.options.getString('interval');
	if (property === null) {property = 'current_price'}
	if (interval === null) {interval = 'm1'}
	if (stock_acronym === null) {stock_acronym = "TSB"}
  
	//return await interaction.reply( await Message_constructors.graph_stock(interaction, stock_acronym, property, interval) )
  await interaction.deferReply();
  return await interaction.editReply( await Message_constructors.graph_stock(interaction, stock_acronym, property, interval) )
}


export { data }
export { execute }
