const { SlashCommandBuilder } = require('@discordjs/builders');
const {Database} = require("../database.js")
const {Charts_functions} = require("../helper_functions/charts.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test!'),
	async execute(interaction) {
		let img = Charts_functions.line_chart()
		await interaction.reply( {content:'test!', files: [img] } );
	},
}


