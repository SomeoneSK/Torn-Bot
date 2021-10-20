const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('company')
		.setDescription('Shows profile of some company')
		.addStringOption(option =>
		option.setName('company_id')
			.setDescription('The company ID')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getString('company_id');

		return await interaction.reply( await responses.company_profile(interaction = interaction, id=id) )
	},
};
