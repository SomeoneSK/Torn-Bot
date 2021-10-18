const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const new_alert_command = require('../alerts/new_alert_command')

const the_command = new SlashCommandBuilder().setName('new-alert').setDescription('Sets new alert.');

the_command.addSubcommandGroup((group) =>
	group
		.setName('stocks')
		.setDescription('Set a new alert for stocks.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('reach')
				.setDescription("Sets a new alert that will ping you when some stock property will reach some value.")
				.addStringOption((option) =>
					option.setName('stock').setDescription('The stock').setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName('higher-or-lower')
						.setDescription('Alert you when the value is higher or lower?')
						.addChoices([
							['Higher', 'higher'],
							['Lower', 'lower'],
						])
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName('property')
						.setDescription('Alert you when what property will reach some value?')
						.addChoices([
							['Price', 'current_price'],
							['Market Cap', 'market_cap'],
							['Total Shares', 'total_shares']
						])
						.setRequired(true),
				)
				.addNumberOption((option) => option.setName('value')	.setDescription('The value to reach')
					.setRequired(true)
				)
			),
);

general.add_stock_options(the_command.options[0].options[0].options[0])

async function execute(interaction) {
	new_alert_command.new_alert_command(interaction)
}

module.exports = {
	data: the_command,
	execute: execute
}
