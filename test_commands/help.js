const { SlashCommandBuilder } = require('@discordjs/builders');
const {Database} = require("../database.js")
const {Charts_functions} = require("../helper_functions/charts.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Need help with the bot?'),
	async execute(interaction) {
		await interaction.reply( {content:'Discord server: https://discord.gg/3RmCckhXWg\nUse `/command-list` to see command list' } );
	},
}


