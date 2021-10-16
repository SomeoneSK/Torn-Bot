const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('foreign-stocks')
		.setDescription('Shows stock of items in foreign countries')
		.addStringOption(option =>
		option.setName('country')
			.setDescription('The country')
			.setRequired(true)
			.addChoice('Mexico', 'Mexico')
			.addChoice('Cayman Islands', 'Cayman Islands')
			.addChoice('Canada', 'Canada')
			.addChoice('Hawaii', 'Hawaii')
			.addChoice('United Kingdom', 'United Kingdom')
			.addChoice('Argentina', 'Argentina')
			.addChoice('Switzerland', 'Switzerland')
			.addChoice('Japan', 'Japan')
			.addChoice('China', 'China')
			.addChoice('UAE', 'UAE')
			.addChoice('South Africa', 'South Africa')),

	async execute(interaction) {
		let country = interaction.options.getString('country');

		return await interaction.reply( await responses.foreign_stocks(interaction=interaction, country_name = country) )
	},
};
