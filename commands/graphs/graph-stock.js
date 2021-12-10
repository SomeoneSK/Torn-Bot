const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
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
				.setName('time-interval')
				.setDescription('time interval')
				.setRequired(false),
		),

	async execute(interaction) {
		let stock_acronym = interaction.options.getString('stock_acronym');
		let property = interaction.options.getString('property');
		let interval = interaction.options.getString('interval');
		if (property === null) {property = 'current_price'}
		if (interval === null) {interval = 'm1'}
		if (stock_acronym === null) {stock_acronym = "TSB"}

		return await interaction.reply( await Message_constructors.graph_stock(interaction, stock_acronym, property, interval) )
	},
};
