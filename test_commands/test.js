const { SlashCommandBuilder } = require('@discordjs/builders');
const {Database} = require("../database.js")
const {Charts_functions} = require("../helper_functions/charts.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test!'),
	async execute(interaction) {
		let img = await Charts_functions.timeline_graph(data={1636145940:10, 1636145941:12, 1636145942:9, 1636145948:3, 1636145980:100}, title = "Test Graph", x_label = "", y_label = "Values")
		await interaction.reply( {content:'test!', files: [img] } );
	},
}


