import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Alerts_command_handler} from '../../alerts/command_handlers/index.js'

const data = new SlashCommandBuilder().setName('new-alert').setDescription('Sets new alert.');

data.addSubcommandGroup((group) =>
	group
		.setName('stocks')
		.setDescription('Set a new alert for stocks.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('reach')
				.setDescription("Sets a new alert that will ping you when some stock property will reach some value.")
				.addStringOption((option) =>
					option.setName('stock').setDescription('The stock - use stock acronym').setRequired(true),
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
				.addNumberOption((option) => option.setName('value')	.setDescription('The value to reach')
					.setRequired(true)
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
						.setRequired(false),
				)
			),
);

//general.add_stock_options(data.options[0].options[0].options[0])

async function execute(interaction) {
	Alerts_command_handler.command_handler(interaction)
}

export { data }
export { execute }