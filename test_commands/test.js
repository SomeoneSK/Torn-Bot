const { SlashCommandBuilder } = require('@discordjs/builders');
const {Database} = require("../database.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test vomm!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user'))),
	async execute(interaction) {
		await interaction.reply('test!');
	},
}


